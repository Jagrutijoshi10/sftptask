"use strict";
let moment = require('moment');
let _ = require('underscore');
let configure = require('../config/config.json');
let remotePathToList = '/home/joshi/sftpfolder/';
let Client = require('ssh2').Client;


// TODO: move this to config.json with env as local and prod.eg: {local:{},prod:{}}
module.exports = function () {
    var self = {};
    self.getfiles = (req, res) => {
        let conn = new Client();
        conn.on('ready', function () {
            conn.sftp(function (err, sftp) {
                if (err) throw err;
                sftp.readdir(remotePathToList, async function (err, list) {
                    if (err) throw err;
                    // console.dir(list);
                    let finaldata = await calc(list);
                    res.send(finaldata);
                    conn.end();
                    // console.log(finaldata) ;
                });
            });
        }).connect(configure.sftp.local);
    }
    return self;
}();

function calc(log) {
    //  log=log.attrs;
    //  console.log(log)
    let isAbouve2hrs = false;
    let newarr = [];
    let currentTime = moment().format('LLL');
    // console.log(currentTime);
    _.each(log, (i) => {
        try {
            let age = moment.unix(i.attrs.atime).format('LLL');
            // console.log(age);
            if (age <= currentTime) {
                var longAge = moment(currentTime).diff(age, 'minutes');
            }
            else {
                var longAge = moment(age).diff(currentTime, 'minutes');
            }
            // console.log(longAge);
            if (longAge >= 120) {
                isAbouve2hrs = true;
                var data = _.extend({ i }, { "currentTime": currentTime, "age": age, "longAge": longAge + ' min', "isAbouve2hrs": isAbouve2hrs });
                newarr.push(data);
                // await newarr.push(i);
            }
            else {
                isAbouve2hrs = false;
                var data = _.extend({ i }, { "currentTime": currentTime, "age": age, "longAge": longAge + ' min', "isAbouve2hrs": isAbouve2hrs });
                newarr.push(data);
            }
            // await cb(null, list);
        }
        catch (e) {
            console.log(e);
        }
    })
    // console.log(newarr);
    if (log.length == 0) {
        var message = "No data found";
        return message;
    } else {
        return newarr;
    }

};