var express = require('express');
const bodyParser = require("body-parser");
//const request = require("request");
const https = require("https");
const req = require('express/lib/request');


const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req, res){
    var fullName = req.body.txtName;
    var email = req.body.txtEmail;

    const data = {
        members :[
            {
                email_address : email,
                status : "subscribed",
                merge_fields:{
                        FULLNAME : fullName
                } 
            }
        ]
    };
     
    var jsonData = JSON.stringify(data);
    const url= "https://us9.api.mailchimp.com/3.0/lists/b3d9ce3775";
    const options = {
        method:"POST",
        auth:"chanhhuynh14:a29b293d9a07e8eec7b65f7e5ab5d604-us9"
    };
    const request = https.request(url,options, function(response){

        if(response.statusCode === 200){
            res.send("Successfully subscribed");
        }else{
            res.send("Error, please try again");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    
    request.write(jsonData);
    request.end();
})
app.listen(process.env.POST || 3000 , function(){
    console.log("Open port 3000");
});

//API Key
// a29b293d9a07e8eec7b65f7e5ab5d604-us9

// b3d9ce3775