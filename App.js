const express = require("express")
const path= require("path")
const mysql = require("mysql2")
const app = express()

 app.get("/",(req,res)=>
{
  //  res.send("<h1> Welcome To Server....</h1>")
    res.sendFile(path.join(__dirname,"pages","index.html"))
})
 app.get("/about",(req,res)=>
{
  //  res.send("<h1> Welcome To Server....</h1>")
    res.sendFile(path.join(__dirname,"pages","about.html"))
})
 app.get("/contact",(req,res)=>
{
  //  res.send("<h1> Welcome To Server....</h1>")
    res.sendFile(path.join(__dirname,"pages","contact.html"))
})
 app.get("/login",(req,res)=>
{
  //  res.send("<h1> Welcome To Server....</h1>")
    res.sendFile(path.join(__dirname,"pages","login.html"))
})
 app.get("/register",(req,res)=>
{
  //  res.send("<h1> Welcome To Server....</h1>")
    res.sendFile(path.join(__dirname,"pages","register.html"))
})

 app.get("/save",(req,res)=>
{
    const formData= req.query
  

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "My$ql123",
  database: "persondb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  const sql = `INSERT INTO person (name, age,mobile,password,email,gender) VALUES ('${formData.name}','${formData.age}','${formData.mobile}','${formData.password}','${formData.email}','${formData.gender}')`
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
    console.table(formData)
  //  res.send("<h1> Welcome To Server....</h1>")
    res.sendFile(path.join(__dirname,"pages","login.html"))
})

app.get("/auth",(req,res)=>{
  // const email=req.body.email;
  // const password=req.body.password;
const q=req.query
  const email=q.email
  const password=q.password

  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "My$ql123",
    database: "persondb"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `SELECT * FROM person WHERE email = '${email}' AND password = '${password}'`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      if(result.length > 0){
        res.sendFile(path.join(process.cwd(),"pages","welcome.html"));
      //   res.redirect("/Welcome")
      } else {
        res.sendFile(path.join(process.cwd(),"pages","login.html"));
      }
    });
  });
})

 app.get("/*",(req,res)=>
{
    res.status(404)
    res.set("Content-Type","Text/html")
  //  res.send("<h1> Welcome To Server....</h1>")
    res.sendFile(path.join(__dirname,"pages","404.html"))
})

// app.listen(port,ip,callback-function()) 
app.listen(3000, () => {
    console.log("Server started on http://127.0.0.1:3000")
}) 
