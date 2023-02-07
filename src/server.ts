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

/*app.get("/",async (req : any,res : any) => {
    const forwardedHeaders = JSON.parse(req.get("forwardedHeaders"));
    const finalURL = forwardedHeaders.finalURL;
    delete forwardedHeaders.finalURL;
    const otherHeaders = Object.keys(forwardedHeaders);
    const finalRes = await fetch(finalURL);
    const converted = convertResponseToJSON(await finalRes.text());
    // parse XML if neccessary
    //console.log(finalRes.data);
    res.headers = otherHeaders;
    return res.json(converted);
});*/


app.post("/",async (req : any,res : any) => {
    const companionSpecific = req.body.companionSpecific;
    delete req.body.companionSpecific;
    const headers = req.headers;
    console.log(JSON.stringify(headers));

    const method = companionSpecific.finalMethod;
    const finalURL = companionSpecific.finalURL;
    const bodyToSend = method != "Get" ? req.body : undefined;

    const finalRes = await fetch(finalURL, {"method":method, body:bodyToSend, headers:headers});
    const converted = convertResponseToJSON(await finalRes.text());
    res.send(finalRes);
});

app.listen(port, () => {
    console.log("running server");
})
