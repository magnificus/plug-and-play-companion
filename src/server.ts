var express = require('express')
console.log("ayy caramba")

var cors = require('cors')
var app = express()
const port = 6655;

// allow requests from anywhere (even though itll most likely be localhost)
app.use(cors({
    origin: '*'
}));

app.listen(port, () => {
    console.log("running server");
})

app.get("/",(req : any,res : any) => {
    console.log("hello mate");
    res.send({"Response":"Hello"});
});