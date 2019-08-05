"use strict";
let moment = require('moment')
let _ = require('underscore')
let Client = require('ssh2').Client;
// const Fs = require('fs')

// TODO: move this to config.json with env as local and prod.eg: {local:{},prod:{}}
let connSettings = {
    host: '172.16.4.46',
    port: 22,
    username: 'joshi',
    password: 'root@123'
};

let remotePathToList = '/home/joshi/sftpfolder';

function test() {
    this.getfiles = (req, res) => {
        let conn = new Client();
        conn.on('ready', function () {
            conn.sftp(function (err, sftp) {
                if (err) throw err;
                sftp.readdir(remotePathToList, async function (err, list) {
                    if (err) throw err;
                    // console.dir(list);
                    // res.setHeader('Content-Type', 'application/json');
                    let finaldata = await calc(list)
                    res.send(finaldata)
                    conn.end();
                    // console.log(finaldata) ;
                });
            });
        }).connect(connSettings);
    }
}

function convert_to_24h(time_str) {
    // Convert a string like 10:05:23 PM to 24h format, returns like [22,5,23]
    let time = time_str.match(/(\d+):(\d+):(\d+) (\w)/);
    let hours = Number(time[1]);
    let minutes = Number(time[2]);
    let seconds = Number(time[3]);
    let meridian = time[4].toLowerCase();

    if (meridian == 'p' && hours < 12) {
        hours += 12;
    }
    else if (meridian == 'a' && hours == 12) {
        hours -= 12;
    }
    return [hours, minutes, seconds];
};


function calc(log) {
    let newarr = []
    let currentTime = moment().minutes()
     console.log(currentTime)
    let crt = convert_to_24h(currentTime)
    _.each(log, (i) => {
        try {
            // console.log( i.attrs.atime)
            let accessedTime = i.attrs.atime;
            // console.log(accessedTime)
            let at = moment.unix(accessedTime).format('LTS');
            // console.log(at)
            let hrs24 = convert_to_24h(at);
            // console.log(hrs24)
            let totalHoursInMinaccessedTime = (hrs24[0] * 60) + hrs24[1];
            currentTime = (crt[0] * 60) + crt[1];
            // console.log({ct:currentTime})
            // console.log({at:totalHoursInMinaccessedTime})
            if (totalHoursInMinaccessedTime <= currentTime) {
              var  totalTime = currentTime - totalHoursInMinaccessedTime;
                //   console.log({tt:totalTime})
            }
            else {
                totalTime = totalHoursInMinaccessedTime - currentTime;
                //   console.log({tt:totalTime})
            }
            if (totalTime >= 120) {
                let ct="longAge";
                let value1=currentTime+' min';
                i.attrs[ct]=value1;
                let tt = "age";
                let value = totalTime + ' min';
                i.attrs[tt] = value;
              
                newarr.push(i);
                // console.log(newarr)
            }
            else {
                let tt = "totalTime";
                let value = totalTime + ' min';
                i.attrs[tt] = value;
                // console.log(i);
            }
            // await cb(null, list);
        }
        catch (e) {
            console.log(e);
        }

    })
    if (newarr.length == 0) {
        var message = "No data found";
        return message;
    } else {
        return newarr;
    }

};
module.exports = new test();