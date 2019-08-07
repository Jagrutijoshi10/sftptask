// TODO: add to all the files.
"use strict";
const express=require('express'),
      test=express(),
      router=require('./router/router.js');
// router.config(test);

test.use('/path',router);
router.takk();

test.listen(3000,()=>{
    console.log('server listening on port 3000');
});
module.exports=test;
// TODO: need to catch errors and ensure server never crashes
//Question: CORS how to implement using this logics? any example would help
