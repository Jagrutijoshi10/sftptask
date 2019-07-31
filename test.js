const express=require('express')
const test=express();
const router=require('./router/router.js')
router.config(test)
test.listen(3000,()=>{
    console.log('server listening on port 3000')
})



// module.exports=test;




