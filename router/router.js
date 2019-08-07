"use strict";
const express=require('express');
const router = express.Router();
const cont=require('../controller/controller.js')

module.exports.takk=function(){
    router.get('/data',(req,res)=>{
        cont.getfiles(req,res);
      
        })
};

    // this.config=()=>{
    //     router.get('/data',(req,res)=>{
    //         cont.getfiles(req,res)
    //     })
    // }
//
// function(err, list){
//     res.send(list);
// }) 
// module.exports=router;

// TODO: try using module.exports = function(){};