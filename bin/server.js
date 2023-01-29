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
app.listen(port, () => {
    console.log("running server");
});
app.get("/", (req, res) => {
    const forwardedHeaders = JSON.parse(req.get("forwardedHeaders"));
    const finalURL = forwardedHeaders.finalURL;
    delete forwardedHeaders.finalURL;
    const otherHeaders = Object.keys(forwardedHeaders);
    console.log("other headers: " + otherHeaders);
    console.log("final URL: " + finalURL);
    console.log("hello mate");
    res.send({ "Response": "Hello" });
});
app.post("/", (req, res) => {
    console.log("ya tryin to post??");
    res.send({ "Response": "PostMate" });
});
