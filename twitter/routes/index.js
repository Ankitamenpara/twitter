var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var url = 'mongodb://localhost:27017/users';

mongo.connect(url, function(err, db){
	if(err) throw err
		db.createCollection('users', function(err,collection){

		})
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('homepage');
});


router.post('/insert', function(req, res, next){
	console.log(req);
	var item = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: req.body.password,
		password_confirmation: req.body.password_confirmation
	};

	mongo.connect(url, function(err, db){
		if(err) throw err
		
		db.collection('users').insertOne(item, function(err, result){
			
			console.log('user inserted');
			db.close();
		})
	})

	res.redirect('/');
});


module.exports = router;
