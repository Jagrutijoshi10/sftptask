"use strict";
const express=require('express');
var router = express.Router();
const cont=require('../controller/controller.js')
router.get('/path/data',(req,res)=>{
    cont.getfiles(req,res);
    })

module.exports=router;








// function router(){
//     this.config=(test)=>{
//         test.get('/path/data',(req,res)=>{
//             cont.getfiles(req,res)
//         })
//     }
// }

// function(err, list){
//     res.send(list);
// }) 
// module.exports=new router();

// TODO: try using module.exports = function(){};