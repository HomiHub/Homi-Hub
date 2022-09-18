const express = require("express");

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const fireInit = require("firebase/app")
const fireAuth = require("firebase/auth")

const firebaseConfig = {
    apiKey: "AIzaSyAqpDluhK8saUWR1SfBXDhvFwX3worwRQo",
    authDomain: "homi-hub-dafc9.firebaseapp.com",
    databaseURL: "https://homi-hub-dafc9-default-rtdb.firebaseio.com",
    projectId: "homi-hub-dafc9",
    storageBucket: "homi-hub-dafc9.appspot.com",
    messagingSenderId: "817682980513",
    appId: "1:817682980513:web:d7f96b94d9ed5462f99ae0",
    measurementId: "G-2HWCV1J0EE"
  };

  
// Initialize Firebase
const fireApp = fireInit.initializeApp(firebaseConfig);
const auth = fireAuth.getAuth(fireApp);

app.get("/", function(req, res) {
    res.send("server is running ");
})

app.get("/signup", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/signup", function(req, res) {
    console.log(req.body);
    const email = req.body.email;
    const pass = req.body.password;
    fireAuth.createUserWithEmailAndPassword(auth, email, pass).then(cred => console.log(cred));
    res.send("<h1>A new account was created successfully<h1>");
})


app.listen(3000, function(req, res) {
    console.log("listening on port 3000");
})

