const mongoose = require('mongoose');
require("dotenv").config();

const connectDB = async (req, res) => {
  const uri = process.env.DB_URI;
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('connected to db'))
    .catch((err) => console.log(err));
}

module.exports = connectDB;
