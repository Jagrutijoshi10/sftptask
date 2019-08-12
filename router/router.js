"use strict";
const express = require('express'),
    router = express.Router(),
    ctrl = require('../controller/controller');
router.get('/data', (req, res) => {
    ctrl.getfiles(req, res);
})
module.exports = router;





// function(err, list){
//     res.send(list);
// }) 


// TODO: try using module.exports = function(){};