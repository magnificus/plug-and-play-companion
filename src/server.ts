import express, { response } from "express";
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
            return responseText;
        }
    }
    return responseText;
}

// allow requests from anywhere (even though itll most likely be localhost)
app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.post("/",async (req : any,res : any) => {
    const companionSpecific = req.body;//parsedBody.companionSpecific;
    //const headers = req.headers;

    const finalRes = await fetch(companionSpecific.finalURL, {method:companionSpecific.finalMethod, body:companionSpecific.finalBody, headers:companionSpecific.finalHeaders});
    const converted = convertResponseToJSON(await finalRes.text());
    res.status(finalRes.status);
    res.json(converted);
});

app.listen(port, () => {
    console.log("running server");
})
