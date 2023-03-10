// basic server structure

// 1.import express,body-parser,mongoose
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors =require ('cors');
const {movieModel} = require('./model');
const path = require('path'); 

// 2.Initialising 
const app = new express();

// middleware-to make urlencoding and json data format
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'/build'))); 
//3. db connection


// mongoose.connect("mongodb+srv://tiya:mongo24@cluster0.qh8z9se.mongodb.net/ReactMST?retryWrites=true&w=majority",{
//     useNewUrlParser:true,
//    useUnifiedTopology:true
//  } )
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type ");
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     next();
// })
// 4.API creation
 
app.get('/api/home',async(req,res)=>{
    // console.log("get ")
   var result = await movieModel.find();
   res.json(result);
})

app.post('/api/add',(req,res)=>{
    console.log("body is"+req.body)
    let movie = {
        moviename:req.body.moviename,
        actor:req.body.actor,
        actress:req.body.actress,
        director:req.body.director,
        releaseyear:req.body.releaseyear,
        camera:req.body.camera,
        producer:req.body.producer,
        language:req.body.language
    }
    let result = movieModel(movie);
    result.save()
    res.send(result)
})
app.post('/api/async',async(req,res)=>{
    console.log("asyn"+ req.body)
    let movieasync = new movieModel(req.body).save();
    // let output =await movieasync.save();
    res.json(movieasync);
})


// update
app.post('api/update',async (req,res)=>{
    try{
        console.log("update", req.body)
        let result = await movieModel.findByIdAndUpdate(req.body._id,req.body);
        console.log("result",result);
        res.json(result)
    }
    catch(error){
        res.status(500).send(error)
       
    }

})
app.post('/api/delete',async(req,res)=>{
    try{
        await movieModel.findByIdAndDelete(req.body._id);
        res.send("data deleted")
    }
    catch(error){
        res.status(500).send(error)

    }
})

// search
app.post('/api/search',async(req,res)=>{
    try{
        console.log("search")
        console.log("req.body", req.body)
        let result = await movieModel.find({ "moviename":{$regex: '.*'+req.body.moviename+'.*' } });
        console.log("result",result)
        res.json(result);
    }
    catch(error){
        res.status(500).send(error)

    }
})
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/build/index.html'));
 });
// 5.port assigning
app.listen(8080,()=>{
    console.log("lisiting to port 3001")
})
