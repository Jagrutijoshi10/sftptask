const cont=require('../controller/controller.js')
function router(){
    this.config=(test)=>{
        test.get('/path/data',(req,res)=>{
            cont.getfiles(req,res)
        })
    }
}
module.exports=new router();