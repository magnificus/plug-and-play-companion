"use strict";
var express = require('express');
console.log("ayy caramba");
var cors = require('cors');
var app = express();
const port = 6655;
// allow requests from anywhere (even though itll most likely be localhost)
app.use(cors({
    origin: '*'
}));
app.get("/", (req, res) => {
    res.send("Hello");
});
app.listen(port, () => {
    console.log("running server");
});
