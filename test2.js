var config = {host: '172.16.4.46', username: 'joshi', password: 'root@123' };
var SFTPClient = require('sftp-promises');
var sftp = new SFTPClient(config);
sftp.stat('/home/joshi/sftpfolder').then(function(list) { console.log(list) })