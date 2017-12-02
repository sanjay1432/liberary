var express = require('express');
var router = express.Router();
var User = require('../models/User.js');

var rand,host,mailOptions;

router.get('/', function(req, res, next) {
  // res.send('Express REST API');
  User.find(function(err, users){
    if (err){ res.send(err); }

    res.json(users);
  });

});

/* SAVE User */
router.post('/', function(req, res, next) {
//   res.send(req.body);

   console.log(req.body)

  var user = new User();

  // Set the user name, and add our friend to the friends array 
      user.username=req.body.username;
      user.password= user.generateHash(req.body.password);
      user.isAdmin= req.body.isAdmin;
  // Save the user to the database
  // If we don't get any errors respond with a success message
  user.save(function(err, userresponse){
    
          if (err) { res.send(err); 
           }
        //    res.json({ message: 'We have created a new user!' });  
        console.log(userresponse)
        res.send(userresponse);
  });
});


router.post('/authenticate',function(req,res){

User.findOne({'username' : req.body.username}, function(err,doc){
    console.log(doc)
    if(err) throw err;
    if(doc){
        if (!doc.validPassword(req.body.password)) {
              //password did not match
              console.log("Password not found");
              res.send({ 
                  token: false
              });
    } else {
        // password matched. proceed forward
        console.log("Found: "+doc.username+", pass="+doc.password);
        res.send({ 
            token: true,
            userinfo:doc
        });
      }
       
    }
    else{
        console.log("Not found: ");
        res.send({ 
            token: false
        });
    } 
});
});
/*
// When we make a DELETE request we want to 
// remove the user with the specified id, if 
// there are no errors we'll again respond 
// with a success message
*/
router.delete('/:user_id',function(req, res){
  User.remove({_id:req.params.user_id}, function(err, user){
      if (err){ res.send(err); }

      res.json({ message: 'Successfully removed!' });
  });
})

module.exports = router;