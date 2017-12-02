var express = require('express');
var router = express.Router();
var Liberary = require('../models/Liberary.js');
var Book = require('../models/Book.js');

router.get('/', function(req, res, next) {
    // res.send('Express REST API');
    Book.find(function(err, Book){
      if (err){ res.send(err); }

      res.send(Book);
    });
  
  });

  router.post('/info', function(req, res, next) {
    // res.send('Express REST API');

    Book.find({ liberaryId: req.body.id }, function(err, books){
      if (err){ res.send(err); }
      console.log('Got Books')

      res.send(books);
    });
  
  });

  router.post('/remove', function(req, res, next) {
    // res.send('Express REST API');
 
    Book.remove({ liberaryId: req.body.liberaryId, _id:req.body.bookId }, function(err, books){
      if (err){ res.send(err); }
      console.log('Book Removed')

      res.send(books);
    });
  
  });

  router.post('/issue', function(req, res, next) {
    // res.send('Express REST API');
   
    Book.update(
      { liberaryId: req.body.liberaryId, _id:req.body.bookId},
      { $addToSet: { issuedTo: req.body.userId } },
      // { $inc: { quantity: -1 } },
        function(err, books){
        if (err){ res.send(err); }

        res.send({issued:true});
      }
    )

    Book.update(
      { liberaryId: req.body.liberaryId, _id:req.body.bookId},
      // { $addToSet: { issuedTo: req.body.userId } },
      { $inc: { quantity: -1 } },
      function(err, books){
        if (err){ res.send(err); }
        console.log('Updated Quantity')
        //   console.log(books)
        // res.send({issued:true});
      }
    )
  });
   
  router.post('/return', function(req, res, next) {
    // res.send('Express REST API');

    Book.update(
      { liberaryId: req.body.liberaryId, _id:req.body.bookId},
      { $pull: { issuedTo: req.body.userId } },
      // { $inc: { quantity: 1 } },
        function(err, books){
        if (err){ res.send(err); }
        console.log('Updated Books')

        res.send({issued:false});
      }
    )

    Book.update(
      { liberaryId: req.body.liberaryId, _id:req.body.bookId},
      // { $addToSet: { issuedTo: req.body.userId } },
      { $inc: { quantity: 1 } },
      function(err, books){
        if (err){ res.send(err); }
        console.log('Updated Quantity')
        //   console.log(books)
        // res.send({issued:true});
      }
    )
  });
router.post('/',function(req,res){
    var book = new Book();
    
      // Set the user name, and add our friend to the friends array 
      book.liberaryId=req.body.libId;
      book.bookTitle=req.body.title;
      book.bookAuthor=req.body.author;
      book.bookPrice=req.body.price;
      book.quantity=req.body.quantity;
      
    
      // Save the user to the database
      // If we don't get any errors respond with a success message
      book.save(function(err, bookresponse){
        
              if (err) { res.send(err); 
               }
            //    res.json({ message: 'We have created a new user!' });  
            res.send(bookresponse);
      });
});

module.exports = router;