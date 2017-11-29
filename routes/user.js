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

router.get('/verify',function(req,res){
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.token==rand)
        {
            console.log("email is verified");
            User.update({'_id':req.query.id}, {$set: {activated : true}}, {w:1}, function(err, result){
                console.log(result);
                // res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
                res.redirect('/login?valid='+true);
            });
         
        }
        else
        {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    }
    else
    {
        res.end("<h1>Request is from unknown source");
    }
});

router.post('/forgotpassword',function(req,res){
    console.log(req.body)
    host=req.get('host');
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'squadc007@gmail.com', // generated ethereal user
                pass: 'creative_squad'  // generated ethereal password
            }
        });
        // setup email data with unicode symbols
        mailOptions = {
            from: 'squadc007@gmail.com', // sender address
            to: req.body.forgot, // list of receivers
            subject: 'Reset your password', // Subject line
            text: 'To reset password please click on given link', // plain text body
            html: '<p>Click <a href="http://'+req.get('host')+'/user/reset?id='+req.body.forgot+'">here</a> to reset password</p>' // html body
        };
  
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
      });
});
router.post('/resetpassword',function(req,res){
    console.log(req.body)

    User.findOne({'email' : req.body.email}, function(err,doc){
        if(err) throw err;
        if(doc){
                     var user =  User();
            User.update({'_id':doc._id}, {$set: {password : user.generateHash(req.body.newpassword)}}, {w:1}, function(err, result){
                res.redirect('/home');
            });
           
        }
        else{
            console.log("Not found: ");
            res.send({ 
                token: false
            });
        } 
    });
});

router.get('/reset',function(req,res){
    console.log('from server:' +req.protocol+":/"+req.get('host'));
    console.log('in local:'+"http://"+host)
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
    
                res.redirect('/forgot?id='+req.query.id);
    
    }
    else
    {
        res.end("<h1>Request is from unknown source");
    }
});

router.post('/authenticate',function(req,res){
//     console.log('at route')
//    console.log(req.body)
//         res.send({ 
//             token: true
//         });
console.log(req.body.username)
User.findOne({'username' : req.body.username}, function(err,doc){
    console.log(doc)
    if(err) throw err;
    if(doc){
             console.log(doc)
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