//jshint esversion:6

const express = require('express');
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");

 
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

 app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
 });

 app.post("/", function(req, res){
    const firstName = (req.body.fname);
    const lastName = (req.body.lname);
    const email = (req.body.email);
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]

    };

    const jsonData = JSON.stringify(data);

    const url = "https://us12.api.mailchimp.com/3.0/lists/7b1fbe595e";

    const options = {
        method: "POST",
        auth: "Siddiqui1:5929e0ae58496ea91033bf661a1ce5ed-us12"
    }

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/succes.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

 });

 app.post("/failure", function(req, res){
    res.redirect("/"); 
 })


 app.listen(process.env.PORT, function(){
    console.log("i'm on the way");
 });


 
