const cont=require('../controller/controller.js')
function router(){
    this.config=(test)=>{
        test.get('/path/data',(req,res)=>{
            cont.getfiles(req,res)
        })
    }
}
// function(err, list){
//     res.send(list);
// }) 
module.exports=new router();