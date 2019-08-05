// TODO: add to all the files.
"use strict";

const express=require('express');
const test=express();
const router=require('./router/router.js');


//Question: CORS how to implement using this logics? any example would help
router.config(test);
test.listen(3000,()=>{
    console.log('server listening on port 3000')
});
// TODO: need to catch errors and ensure server never crashes
1