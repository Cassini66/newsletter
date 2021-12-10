const express=require("express");
const bodyParser=require("body-parser");
const request =require("request");
const https =require("https");
const port= process.env.PORT || 3000;
const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//to get request
app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");
});
// to post data
app.post("/",function(req,res){
const firstName=req.body.fname;
const lastName=req.body.lname;
const email=req.body.email;
const data={
  members:[
  {email_address: email,
  status: "subscribed",
  merge_fields: {
	FNAME: firstName,
	LNAME: lastName
  }
  }
]
};
const jsonData =JSON.stringify(data);
const url="https://us20.api.mailchimp.com/3.0/lists/9ceebed4a8";
const options={
  method:"POST",
  auth:"n:5ef959fa1a6b270bd4803328e46d1b2a-us20"
};

/*9ceebed4a8*/

const request=https.request(url,options,function(response){
  if(response.statusCode===200)
  res.sendFile(__dirname+"/success.html");
  else
  res.sendFile(__dirname+"/failure.html");
response.on("data",function(data){
   console.log(JSON.parse(data));
 });
});
request.write(jsonData);
request.end();
});

//redirecting to home page or any mention page we mention home as /
app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(port,function() {
  console.log("server is running on port 3000");
});
