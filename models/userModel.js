const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: [true, "name must be unique"],
            required: [true, "name required"],
            maxlength: [100, "Too long name"],
            trim: true,
        },
        slug: {
            type: String,
            lowercase: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
