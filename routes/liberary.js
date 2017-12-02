var express = require('express');
var router = express.Router();
var Liberary = require('../models/Liberary.js');
var User = require('../models/User.js');

router.get('/', function(req, res, next) {
    // res.send('Express REST API');
    Liberary.find(function(err, liberary){
      if (err){ res.send(err); }

      res.send(liberary);
    });
  
  });

  router.post('/info', function(req, res, next) {
    // res.send('Express REST API');

    Liberary.find({ _id: req.body.id }, function(err, liberary){
      if (err){ res.send(err); }
        console.log(liberary)
      res.send(liberary);
    });
  
  });

  router.post('/remove', function(req, res, next) {
    // res.send('Express REST API');
    console.log(req.body)
    Liberary.remove({ _id: req.body.liberaryId}, function(err, liberary){
      if (err){ res.send(err); }
      console.log('Liberary Removed')
 
      res.send(liberary);
    });
  
  });
router.post('/',function(req,res){
    var liberary = new Liberary();
    
      // Set the user name, and add our friend to the friends array 
      liberary.liberaryName=req.body.libName;
    
      // Save the user to the database
      // If we don't get any errors respond with a success message
      liberary.save(function(err, libresponse){
        
              if (err) { res.send(err); 
               }
            //    res.json({ message: 'We have created a new user!' });  

            res.send(libresponse);
      });
});

module.exports = router;