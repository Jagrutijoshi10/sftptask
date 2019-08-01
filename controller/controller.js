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
    this.getfiles = (req,res, cb ) => {
        var conn = new Client();
        conn.on('ready', function () {
            conn.sftp(function (err, sftp) {
                if (err) throw err;
                sftp.readdir(remotePathToList, function (err, list) {
                    if (err) throw err;
                    // console.dir(list);
                    currentTime = 900
                    // res.setHeader('Content-Type', 'application/json');
                
                    console.log(typeof(calc(list)))
                //  var gan=  calc(list)
                 res.send(calc(list))
                
                 
                    conn.end();
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


  function calc(list){
    _.each(list, async (i) => {
        try {
            // console.log( i.attrs.atime)
            accessedTime = i.attrs.atime;
            accessedTime =  moment(accessedTime).format('LTS');
            // console.log(accessedTime)
            hrs24 =  convert_to_24h(accessedTime)
            // console.log(hrs24)
            totalHoursInMin =  (hrs24[0] * 60) + hrs24[1];
            // console.log(totalHoursInMin)
            if (totalHoursInMin <= 900) {
               let  totalTime = currentTime - totalHoursInMin;
                if (totalTime >= 120) {
                    var tt = "totalTime";
                    var value = totalTime + ' min';
                    i.attrs[tt] = value;  
                    console.log(i)
                
                }
            else {
                totalTime = totalHoursInMin - currentTime;  
            }
          
        }
        var data= await i;
        return data;
        // await cb(null, list);
        }
        catch (e) {
            console.log(e)
        }  
    })
  
}



module.exports = new test();