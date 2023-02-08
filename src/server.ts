import express from "express";
import { xml2json } from 'xml-js';
import fetch from 'node-fetch';
import cors from 'cors';

var app = express()
const port = 6655;

function convertResponseToJSON(responseText : any){
    try {
        return JSON.parse(responseText);
    } catch (e){
        try {
            return xml2json(responseText);
        } catch (e){
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

app.get("/",async (req : any,res : any) => {
    console.log("getting");
    /*const forwardedHeaders = JSON.parse(req.get("forwardedHeaders"));
    const finalURL = forwardedHeaders.finalURL;
    delete forwardedHeaders.finalURL;
    const otherHeaders = Object.keys(forwardedHeaders);
    const finalRes = await fetch(finalURL);
    const converted = convertResponseToJSON(await finalRes.text());
    // parse XML if neccessary
    //console.log(finalRes.data);
    res.headers = otherHeaders;*/
    return res.json({});
});


app.post("/",async (req : any,res : any) => {
    console.log("posting");
    const parsedBody = req.body;
    console.log("pb: " + parsedBody);
    const companionSpecific = parsedBody.companionSpecific;
    console.log("posting3");
    delete parsedBody.companionSpecific;
    const headers = req.headers;
    //console.log(JSON.stringify(headers));
    console.log("posting2");

    const method = companionSpecific.finalMethod;
    const finalURL = companionSpecific.finalURL;
    const bodyToSend = method != "Get" ? parsedBody : undefined;

    const finalRes = await fetch(finalURL, {"method":method, body:bodyToSend, headers:headers});
    //const converted = convertResponseToJSON(await finalRes.text());
    //res.json(converted);
});

app.listen(port, () => {
    console.log("running server");
})
