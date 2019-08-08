// TODO: add to all the files.
"use strict";
const express = require('express'),
    test = express(),
    router1 = require('./router/router.js'),
    router = express.Router();
test.use('/api', router1);
test.listen((3000), () => {
    console.log('server listening on port 3000');
});
module.exports = test;





// .on('unhandledRejection', (error) => {
//     console.log(' The error was: ', error );
//   }),
// TODO: need to catch errors and ensure server never crashes
//Question: CORS how to implement using this logics? any example would help
