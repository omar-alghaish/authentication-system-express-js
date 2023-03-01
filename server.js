const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db");
const { morganMiddleWare,env} = require("./config/setUp");
const authRoute = require("./routes/authRoutes");

env()

dbConnection();

const app = express();

app.use(cors());

app.use(express.json());

morganMiddleWare();

app.use("/api/v1/users", authRoute);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, (err) => {
  console.log(`App running on port ${PORT}`);
});


