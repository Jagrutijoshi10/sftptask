"use strict";
let moment = require('moment');
let _ = require('underscore');
let configure=require('../config/config.json');
let remotePathToList = '/home/joshi/sftpfolder';

let Client = require('ssh2').Client;
// const Fs = require('fs')

// TODO: move this to config.json with env as local and prod.eg: {local:{},prod:{}}
module.exports= function() {
    var self= {};
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
        }).connect(configure.environment.local.connSettings);
    }
    return self;
}();

 function calc(log) {
    //  log=log.attrs;
    //  console.log(log)
     let isAbouve2hrs=false;
    // let newarr = [];
    let ct = moment().format('k:mm');
    // console.log(ct)
    let currentTime = moment.duration(ct).asMinutes();
    // console.log(currentTime);
    _.each(log, (i) => {
        try {
            let at = moment.unix(i.attrs.atime).format('k:mm');
            console.log(at);
            let age = moment.duration(at).asMinutes();
            // console.log(age);
            if (age <= currentTime) {
                var longAge = moment(currentTime).diff(age);
            }
            else {
                var longAge = moment(age).diff(currentTime);
            }
            // console.log(longAge);
            if (longAge >= 120) {
                isAbouve2hrs=true;
                let ct = "currentTime";
                let value = currentTime + ' min';
                i.attrs[ct] = value;
                let tt = "longAge";
                let value1 = longAge + ' min';
                i.attrs[tt] = value1;
                let flag="isAbouve2hrs";
                let value2=isAbouve2hrs;
                i.attrs[flag]=value2
                // await newarr.push(i);
            }
            else {
                isAbouve2hrs=false;
                let tt = "longAge";
                let value = longAge + ' min';
                i.attrs[tt] = value;
                let flag="isAbouve2hers";
                let value2=isAbouve2hrs;
                i.attrs[flag]=value2
                // await newarr.push(i);
                // console.log(i);
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
        return  log;
    }

};