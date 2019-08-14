// TODO: add to all the files.
"use strict";

process.on('uncaughtException', function (err) {
    console.error('global exception:', err.message);
})
const express = require('express'),
    test = express(),
    router1 = require('./router/router.js'),
    testing = process.env.testing;
// console.log(process.env);
require('dotenv').config();

// console.log("testing:", testing);

test.listen(3000, function () {
    console.log('Example app listening on port 3000!');
})

test.on('error',onerror)
 
function onerror(error){
    if(error.syscall!=='listen'){
            throw error;
    }
 }

test.use('/api', router1);
module.exports = test;




// TODO: need to catch errors and ensure server never crashes
//Question: CORS how to implement using this logics? any example would help
