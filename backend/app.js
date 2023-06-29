const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors = require('cors')

const scoreRoutes=require('./api/routes/scores')

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Routes which should handle requests
app.use('/scores', scoreRoutes);
app.use((req, res, next)=>{
    const error=new Error('Not found');
    error.status=404;
    next(error);
});
app.use((error, req, res, next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    })
});


module.exports=app;