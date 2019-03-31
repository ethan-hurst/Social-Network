const key = require("./config/keys.js");
const express = require('express');
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");

const app = express();
mongoose.connect(key.url, {
    useNewUrlParser: true
  })
  .then(() => console.log("Database Connected!"))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('What are you looking at'));

app.listen(port, () => console.log(`Server running on port ${port}`));