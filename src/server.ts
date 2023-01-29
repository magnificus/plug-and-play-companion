import axios from "axios";
import express from "express";
import { xml2json } from 'xml-js';



var cors = require('cors')
var app = express()
const port = 6655;

function convertResponseToJSON(response : any){
    try {
        if (typeof response == "object"){
            return response;
        } else if (typeof response == "string"){
            return xml2json(response);
        } 
    } catch (e){
        console.error("Couldn't parse response");
        return response;
    }
}


// allow requests from anywhere (even though itll most likely be localhost)
app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.get("/",async (req : any,res : any) => {
    const forwardedHeaders = JSON.parse(req.get("forwardedHeaders"));
    const finalURL = forwardedHeaders.finalURL;
    delete forwardedHeaders.finalURL;
    const otherHeaders = Object.keys(forwardedHeaders);
    //console.log("other headers: " + otherHeaders);
    //console.log("final URL: " + finalURL)
    const finalRes = await axios.get(finalURL);
    const converted = convertResponseToJSON(finalRes.data);
    // parse XML if neccessary
    console.log(finalRes.data);
    res.headers = otherHeaders;
    return res.json(converted);
});


app.post("/",(req : any,res : any) => {
    console.log("ya tryin to post??");
    res.send({"Response":"PostMate"});
});

app.listen(port, () => {
    console.log("running server");
})
