const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const request = require("request");
const https = require("https");
const { post } = require("request");

const app = express();

const APIKey = "e205948d0e5bf83888aed72a4a4924ea-us11";
const AudienceID = "b11fd9afc0";
const UniqueID = "b11fd9afc0";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){
      res.sendFile(path.join(__dirname, "signup.html"));
})

app.post("/", function(req, res){
      var Fname = req.body.fname;
      var Lname = req.body.lname;
      var email = req.body.email;

      const data = {
            members : [
                  {
                        email_address : email,
                        status : "subscribed",
                        merge_fields : {
                              FNAME : Fname,
                              LNAME : Lname
                        }
                  }
            ]
      }

      const JSONdata = JSON.stringify(data);


      const url = "https://us11.api.mailchimp.com/3.0/lists/b11fd9afc0";

      const options = {
            method : "POST",
            auth : "arnab:e205948d0e5bf83888aed72a4a4924ea-us11",
      }


      const request = https.request(url, options, function(response){
            response.on("data", function(data){
                  console.log(JSON.parse(data));
            })
      })
      request.write(JSONdata);
      request.end();
})
app.listen(3000, function(){
      console.log("Server started at 3000!");
})