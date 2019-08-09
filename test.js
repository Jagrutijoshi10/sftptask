// TODO: add to all the files.
"use strict";
const express = require('express'),
    test = express(),
    router1 = require('./router/router.js'),
    testing = process.env.testing;
    // console.log(process.env);
    console.log("testing:",testing);

test.use('/api', router1);
test.use((err,req,res,next) => {
   if(err) throw err;
});
test.listen(3000)
module.exports = test;

// test.use('/api',cors,router1)

// Enabled CORS

// cors =new cors();
// []




// try{
//     if(!err){
//         console.log('server listening on port 3000');
//     }
//    else{
//        throw new err;
//    }
// }
// catch(err){
//    console.log("error caught");
//    return err;

// }
// TODO: need to catch errors and ensure server never crashes
//Question: CORS how to implement using this logics? any example would help
