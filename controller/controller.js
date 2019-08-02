let moment = require('moment')
let _ = require('underscore')
var Client = require('ssh2').Client;
// const Fs = require('fs')

var connSettings = {
    host: '172.16.4.46',
    port: 22, // Normal is 22 port
    username: 'joshi',
    password: 'root@123'
};
var remotePathToList = '/home/joshi/sftpfolder';

function test() {
    this.getfiles = (req, res, cb) => {
        var conn = new Client();
        conn.on('ready', function () {
            conn.sftp(function (err, sftp) {
                if (err) throw err;
                sftp.readdir(remotePathToList, async function (err, list) {
                    if (err) throw err;
                    // console.dir(list);
                    // res.setHeader('Content-Type', 'application/json');
                    finaldata = await calc(list)
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
    var time = time_str.match(/(\d+):(\d+):(\d+) (\w)/);
    var hours = Number(time[1]);
    var minutes = Number(time[2]);
    var seconds = Number(time[3]);
    var meridian = time[4].toLowerCase();

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
    currentTime = moment().format('LTS')
    //  console.log(currentTime)
    crt = convert_to_24h(currentTime)
    _.each(log, (i) => {
        try {
            // console.log( i.attrs.atime)
            accessedTime = i.attrs.atime;
            // console.log(accessedTime)
            at = moment.unix(accessedTime).format('LTS');
            // console.log(at)
            hrs24 = convert_to_24h(at)
            // console.log(hrs24)
            totalHoursInMinaccessedTime = (hrs24[0] * 60) + hrs24[1];
            currentTime = (crt[0] * 60) + crt[1];
            // console.log({ct:currentTime})
            // console.log({at:totalHoursInMinaccessedTime})
            if (totalHoursInMinaccessedTime <= currentTime) {
                totalTime = currentTime - totalHoursInMinaccessedTime;
                //   console.log({tt:totalTime})
            }
            else {
                totalTime = totalHoursInMinaccessedTime - currentTime;
                //   console.log({tt:totalTime})
            }
            if (totalTime >= 120) {
                var tt = "totalTime";
                var value = totalTime + ' min';
                i.attrs[tt] = value;

                newarr.push(i)
                // console.log(newarr)
            }
            else {
                var tt = "totalTime";
                var value = totalTime + ' min';
                i.attrs[tt] = value;
                // console.log(i)
                return false;
            }
            // await cb(null, list);
        }
        catch (e) {
            console.log(e)
        }

    })
    return newarr;
};
module.exports = new test();