const  MongoClient  = require("mongodb").MongoClient;
const state={
    db:null
}
module.exports.connect=function (done) 
{
    const url="mongodb://0.0.0.0:27017";
    const dbname='shoppingcart'
    MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology:true},(err,data)=>
    {
        if(err)
        {
            return done(err)
        }
        else{
            state.db=data.db(dbname)
        }
    })
done()
}
module.exports.get=function()
{
    return state.db
}
    



/*module.exports=
{
userid:{
 email : "alosh@gmail.com",
    password : "$2a$10$sgpZx4LxhALvdIFwFo4GZuvk0GHmNbunETIkmLrIyfRnXHjPIIGma"
}
}*/


