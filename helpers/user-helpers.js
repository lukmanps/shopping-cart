var db=require('../config/connection')
var collection=require('../config/collection')
const bcrypt=require('bcrypt')
const { LongWithoutOverridesClass } = require('bson')
const { resolve } = require('promise')
var objectId=require('mongodb').ObjectId


module.exports=
{
    addUsers:(user)=>
       {   
        return new Promise(async(resolve,reject)=>
        {   let olduser={}
            let repeatUser=await db.get().collection(collection.USERCOLLECTION).findOne({email:user.email})
            if(repeatUser)
            {
                olduser.status=true
             resolve(olduser)           
            }
            else{
                user.password= await bcrypt.hash(user.password,10)   
            db.get().collection(collection.USERCOLLECTION).insertOne(user)
            resolve({status:false})
            }
        })
},
getAllUsers:()=>
{
    return new Promise(async(resolve,reject)=>
    {
      let users= await db.get().collection(collection.USERCOLLECTION).find().toArray()
      resolve(users)
    })
},
getAllProducts:()=>
{
    return new Promise(async(resolve,reject)=>{
        let products=await db.get().collection(collection.PRODUCTCOLLECTION).find().toArray()
        resolve(products);
    })
},
addUserSignup:(user)=>

{  
    
    return new Promise(async(resolve,reject)=>
    {
        let userold={}
        let olduser=await db.get().collection(collection.USERCOLLECTION).findOne({email:user.email})
        if(olduser)
        {
            userold.status=true
            
            resolve(userold)

        }
        else
        user.password= await bcrypt.hash(user.password,10)
        db.get().collection(collection.USERCOLLECTION).insertOne(user)
        resolve({status:false})
        
         resolve (user);
    
    })

},
doUserLOgin:(user)=>
{
    return new Promise(async(resolve,reject)=>
    {
        let response={}
   let validuser= await db.get().collection(collection.USERCOLLECTION).findOne({email:user.email})
   console.log(validuser);
     if(validuser)
     {
        bcrypt.compare(user.password,validuser.password).then((status)=>
        {console.log(status)
            if(status)
            {
                console.log('login sucess')
                response.validuser=validuser;
                response.status=true
                resolve(response)
            }
            else
            {
                
                resolve({status:false})
            }
        })
    }
        else{
            
            resolve({status:false})
        }
     })

},

adminLOgin:(data)=>
{   return new Promise(async(resolve,reject)=>
    {   let response={}
        let validadmin= await db.get().collection(collection.ADMINCOLLECTION).findOne({email:data.email,password:data.password})
        if(validadmin)
        {    console.log("login sucess")
            response.validadmin=validadmin
            response.status=true
            resolve(response)
            
        }
        else{
            console.log("loginfailed")
            response.status=false
            resolve(response)
        }
    
    })
    
},
deleteuser:(userid)=>
{
    return new Promise(async(resolve,reject)=>
    {
        console.log(userid)
        await db.get().collection(collection.USERCOLLECTION).deleteOne({_id:objectId(userid)}).then((response)=>
        {
            console.log(response);
        resolve(response)
        })
    })
},
getUserdetails:(userid)=>
{
    return new Promise(async(resolve,reject)=>
    {
        await db.get().collection(collection.USERCOLLECTION).findOne({_id:objectId(userid)}).then((users)=>
        {
         resolve(users)
        })
    })

},
updateUser:(userid,users)=>
{
    return new Promise(async(resolve,reject)=>
    {
       await db.get().collection(collection.USERCOLLECTION).updateOne({_id:objectId(userid)},{
            $set:
            {
                name:users.name,
                email:users.email
            }
        }).then((response)=>
        {
            resolve(response)
        })
    })
}
}
