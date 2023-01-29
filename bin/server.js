import express from "express";
import { xml2json } from 'xml-js';
import fetch from 'node-fetch';
import cors from 'cors';
var app = express();
const port = 6655;
function convertResponseToJSON(responseText) {
    try {
        return JSON.parse(responseText);
    }
    catch (e) {
        try {
            return xml2json(responseText);
        }
        catch (e) {
            console.error("Couldn't parse response");
        }
    }
    return responseText;
}
// allow requests from anywhere (even though itll most likely be localhost)
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.get("/", async (req, res) => {
    const forwardedHeaders = JSON.parse(req.get("forwardedHeaders"));
    const finalURL = forwardedHeaders.finalURL;
    delete forwardedHeaders.finalURL;
    const otherHeaders = Object.keys(forwardedHeaders);
    //console.log("other headers: " + otherHeaders);
    //console.log("final URL: " + finalURL)
    const finalRes = await fetch(finalURL);
    const converted = convertResponseToJSON(await finalRes.text());
    // parse XML if neccessary
    //console.log(finalRes.data);
    res.headers = otherHeaders;
    return res.json(converted);
});
app.post("/", (req, res) => {
    console.log("ya tryin to post??");
    res.send({ "Response": "PostMate" });
});
app.listen(port, () => {
    console.log("running server");
});
