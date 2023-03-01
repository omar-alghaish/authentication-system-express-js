const mongoose = require("mongoose");

dbConnection = () => {
    mongoose.set("strictQuery", true);
    mongoose
        .connect(process.env.DB_URL)
        .then((connection) => {
            console.log(`Connected to database: ${connection.connection.name}`);
        })
        .catch((err) => {
            console.error(err);
        });
};

module.exports = dbConnection;