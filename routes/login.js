var express = require('express');
var router = express.Router();

/* GET home page. */
var fields = [
  { name: 'username', label: 'Username', type: 'text', required: true },
  { name: 'password', label: 'Password', type: 'password', required: true },
];
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login page', fields:fields});
});

router.post('/', function(req,res){
  const _username=req.body.username;
  if(authenticateUser(_username)===0){
    res.render("login",{message:"user not found"})
  }
  res.render('index', {authenticated:true,username:_username,title:"Welcome!"});
})

function authenticateUser(userName){
  if(userName==="mpatterson") return 1;
  return 0;
}


module.exports = router;
