let express=require('express')
const app=express();
let Client = require('ssh2-sftp-client');
let sftp = new Client();
let moment = require('moment')
let _ = require('underscore')

// app.listen(3000,()=>{
//     console.log('server listening')
// })
// app.get('/getdetails',(req,res)=>{
    sftp.connect({
        host: '172.16.4.46',
        port: '',
        username: 'joshi',
        password: 'root@123'
    }).then(() => {
        return sftp.list('/home/joshi/sftpfolder')
    }).then((data) => {
        ct=900
        //  console.log(data)
        _.each(data, (it) => {
            // console.log(it.accessTime)
            at=it.accessTime;
            at=moment(at).format('LTS');
            // console.log(at)
            day24hrs=convert_to_24h(at)
            // console.log(day24hrs)
            firstdigit=(day24hrs[0]*60)+day24hrs[1];
            // console.log(firstdigit)
            if(firstdigit<=900){
                tt=ct-firstdigit
            }
           else{
            tt=firstdigit-ct
           }
           if(tt>=120){
               console.log(tt+' min')
            console.log(it)
            // res.end(it)
           }
        else{
            return false;
        }
        })
    
    }).catch((err) => {
        console.log(err, 'catch error');
    });
    
// })

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
// module.exports=app,sftp