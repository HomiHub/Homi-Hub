const express = require("express");

const app = express();


app.get("/", function(req, res) {
    res.send("hello everyone we are live! ");
})


app.listen(3000, function(req, res) {
    console.log("listening on port 3000");
})