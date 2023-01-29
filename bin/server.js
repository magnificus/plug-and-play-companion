"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const xml_js_1 = require("xml-js");
var cors = require('cors');
var app = (0, express_1.default)();
const port = 6655;
function convertResponseToJSON(response) {
    try {
        if (typeof response == "object") {
            return response;
        }
        else if (typeof response == "string") {
            return (0, xml_js_1.xml2json)(response);
        }
    }
    catch (e) {
        console.error("Couldn't parse response");
        return response;
    }
}
// allow requests from anywhere (even though itll most likely be localhost)
app.use(cors({
    origin: '*'
}));
app.use(express_1.default.json());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const forwardedHeaders = JSON.parse(req.get("forwardedHeaders"));
    const finalURL = forwardedHeaders.finalURL;
    delete forwardedHeaders.finalURL;
    const otherHeaders = Object.keys(forwardedHeaders);
    //console.log("other headers: " + otherHeaders);
    //console.log("final URL: " + finalURL)
    const finalRes = yield axios_1.default.get(finalURL);
    const converted = convertResponseToJSON(finalRes.data);
    // parse XML if neccessary
    console.log(finalRes.data);
    res.headers = otherHeaders;
    return res.json(converted);
}));
app.post("/", (req, res) => {
    console.log("ya tryin to post??");
    res.send({ "Response": "PostMate" });
});
app.listen(port, () => {
    console.log("running server");
});
