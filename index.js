//importing files
const express = require("express");
const cors = require("cors");

// requiring routers
const router = require("./src/routes");
const connectDB = require("./src/config/database");

//setting up our app
const app = express();
const port = 4000;

//db setup
connectDB();

//setting up cors
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// create application/json parser
app.use(express.json());

//route configure
app.use("/api", router);

//server start
app.listen(port, () => console.log("server at ", port));