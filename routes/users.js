
var express = require('express');
var userHelper=require('../helpers/user-helpers');
const { response } = require('../app');
var router = express.Router();
const productsDisplay = require('../products');

/* GET home page. */
router.get('/', function(req, res, next) {
  let user= req.session.user
  let date=req.session.time
  res.render('index',{productsDisplay, login:user, date, admin:false});
  // userHelper.getAllProducts().then((products)=>
  // {
  //   res.render('index',{productsDisplay,login:user,date,admin:false});
  // })
});

router.get('/login',(req,res,next)=>{
  if(req.session.loggedIn){
    res.redirect('/')
  }else{
  res.render('user/login')
  }
})
router.get('/cart',(req,res,next)=>
{
  if(req.session.loggedIn)
  {
    res.redirect('/')
  }
  else{
  res.render('user/cart',{admin:false})
  }

})

router.post('/login',(req,res,next)=>{
  userHelper.doUserLOgin(req.body).then((response)=>
  {
    if(response.status)
    {
      req.session.loggedIn=true;
      req.session.user=response.validuser
      res.redirect('/')
    }
    else
    {
      res.render('user/login',{loginerr:true})
    }
  })
})
router.get('/signup',(req,res,next)=>
{
  if(req.session.loggedIn)
  {
    res.render('/')
  }
  else
  {
   res.render('user/signup')
  }
})


router.get('/logout',(req,res,next)=>{
       req.session.loggedIn=false;
      req.session.user=null
 // req.session.destroy()
  res.redirect("/");
})
router.post('/signup',(req,res,next)=>
{
  userHelper.addUserSignup(req.body).then((user)=>
  { 
    
    let olduser=user.status
    if(olduser)
    {
      res.render('user/signup',{olduser:true})
    }
    else{

    res.render('user/signup',{registered:true})
    }
  })
})

router.get('/wishlist', (req,res)=>{
  res.render('user/wishlist', {productsDisplay, login:user, date, admin:false});
})

router.get('/cart', (req, res)=>{
  res.render('user/cart', {productsDisplay, login:user, date, admin:false});
})
  


 
module.exports = router;

