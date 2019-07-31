
const Fs = require('fs')
console.log(Fs.statSync('/home/joshi/sftpfolder/sample.txt'))
// function createdDate (file) {  
//   const { birthtime } = Fs.statSync(file)

//   return birthtime
// }

// console.log(  
//   createdDate('home/joshi/sftpfolder/sample.txt')
// )