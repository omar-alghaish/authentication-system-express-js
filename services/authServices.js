const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const slugify = require("slugify");
const User = require("../models/userModel");

// @discription  register midleware (create new user)
// @route        POST  /api/v1/users/register

exports.createUser = (req, res) => {
    const { name, email, password } = req.body;
    bcrypt
        .hash(password, 10)
        .then(async (hashedPassword) => {
            const user = await User.create({
                name,
                slug: slugify(name),
                email,
                password: hashedPassword,
            });
            res.status(201).json({ data: user });
        })
        .catch((error) => {
            res.status(404).json(error.message);
        });
};

// @discription  (login midleware)
// @route        POST  /api/v1/users/login

exports.checkUser = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then((user) => {
            bcrypt
                .compare(password, user.password)
                .then((checkedPasswored) => {
                    if (!checkedPasswored) {
                        return res.status(404).send({
                            message: "Password is incorrect",
                        });
                    }
                    const token = jwt.sign(
                        {
                            Id: user._id,
                            name: user.name,
                            email: user.email,
                        },
                        "right-any-key-here",
                        { expiresIn: "24" }
                    );
                    res.status(200).json({
                        message: "You are logedin successfully",
                    });
                })
                .catch((err) => {
                    res.status(404).json({
                        err,
                    });
                });
        })
        .catch((err) => {
            res.status(404).json({
                message: "email is incorrect",
                status: "404",
                err,
            });
        });
};

exports.auth = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "right-any-key-here");
        const user = decodedToken;
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({
            error: new Error("Invalid request"),
        });
    }
};
