var express=require("express");
var router=express.Router();
var userHelper=require('../helpers/user-helpers')
router.get('/',(req,res,next)=>

{
    if(req.session.loggedInad)
    {
        res.redirect('/admin/view-users')
    }
    else{
    res.render('admin/adminlogin',{admin:true})
    }
})
router.get('/view-users',function(req,res,next)
{
    if(req.session.loggedInad){
        userHelper.getAllUsers().then((users)=>
    {
    
  res.render('admin/view-users',{admin:true,users,adminin:true});
    })
        
    }
    else{
        res.redirect('/admin')
    }
    
});
router.get('/add-user',(req,res)=>
{if(req.session.loggedInad)
    {
        res.render('admin/add-user',{admin:true,adminin:true})

    }
})
router.post('/add-user',(req,res)=>
{
userHelper.addUsers(req.body).then((user)=>
{
let olduser = user.status
if(olduser)
{ 
    res.render('admin/add-user',{admin:true,olduser,adminin:true})

}
else{
    res.redirect('/admin/add-user')

}
})
})
router.post('/login',(req,res)=>
{
    userHelper.adminLOgin(req.body).then((response)=>
    {  
        let admina=response.status;
    
        if(admina)
        {   req.session.loggedInad=true
            req.session.admin=response.validadmin
            res.redirect('/admin/view-users')

        }
        else{
            res.render('admin/adminlogin')
        }
    })
    // {invalid:true,admin:true}
})
router.get('/logout',(req,res,next)=>{
           req.session.loggedInad=false
            req.session.admin=null
    //req.session.destroy();
    res.redirect('/admin');
  })

  //delete
  router.get('/delete-user/:id',(req,res,next)=>
{ 
    if(req.session.loggedInad)
    {
    let userid=req.params.id
    console.log(userid);
    userHelper.deleteuser(userid).then((response)=>
    {
    
        res.redirect('/admin/view-users')
    
    })
}
})
//edit
router.get('/edit-user/:id',async(req,res,next)=>
{
    let users= await userHelper.getUserdetails(req.params.id)
    console.log(users);
res.render('admin/edit-user',{users,admin:true,adminin:true})
})
router.post('/edit-user/:id',(req,res)=>
{
    userHelper.updateUser(req.params.id,req.body).then((data)=>
    {
        res.redirect('/admin/view-users')
    })
})





module.exports=router;