// basic server structure
// npm init-package.json
// npm install express --save --node modules and package.lock.json
// create an index,js file

// 1.Import Express
const express = require("express");

// 2.Initializing Express
const app = new express();

app.use(express.urlencoded({extended:true}));
app.use(express.json())

// 3.API Creation
app.get('/',(req,res)=>{
    res.send("Server is Up and Running........")
    
});
app.post('/signup',(req,res)=>{
    res.send(`Hi ${req.body.name} `)

})

// 4.Setting the port number
app.listen(3001,()=>{
    console.log("server is running in port 3001")
})