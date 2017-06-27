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
	res.render('homepage', {success: req.session.success, errors: req.session.errors });
  	req.session.errors = null;

  	router.post('/', function(req, res, next){
	
		mongo.connect(url, function(err, db){
			if(err) throw err
			
			db.collection('users').find({first_name : req.body.id , password : req.body.password}).toArray(function(err, result){
				console.log(req.query);
				if(result.length !== 0) {
		
					var items = {
						
						textarea: req.body.textarea
					};
					
					mongo.connect(url, function(err, db){
						if(err) throw err
				
						db.collection('data').insertOne(items, function(err, result){
						})	
				
						db.collection('data').find({}, { textarea : 1}).toArray(function(err, results){
							
							res.render('userpage', {name : (req.body.id).toUpperCase(), data : results});



							db.close();

						})
					})
						
				} else {
					res.redirect('/');

				}
				
			});

				db.close();
		})
	
	});
});

router.post('/insert', function(req, res, next){
	req.check('email', 'Invalid email address').isEmail();
	req.check('password','password is invalid').equals(req.body.confirm_password);

	var errors = req.validationErrors();
	
	if(errors) {
		req.session.errors = errors;
		req.session.success = false;
		res.redirect('/');
	}else {
		req.session.success = true;
		
	

		var item = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: req.body.password,
		};

		mongo.connect(url, function(err, db){
			if(err) throw err
			
			db.collection('users').insertOne(item, function(err, result){
				
				db.close();
			})
		})
		var items = {
			
					textarea: req.body.textarea
				};
				
				mongo.connect(url, function(err, db){
					if(err) throw err
			
					db.collection('data').insertOne(items, function(err, result){
					})	
			
					db.collection('data').find({}, { textarea : 1}).toArray(function(err, results){
						
						res.render('userpage', {name : (req.body.first_name).toUpperCase(), data : results});
				
						db.close();

					})
				})
	}
});


router.post('/share', function(req, res, next){
	
	var items = {
			
		textarea: req.body.textarea
	};
	
	mongo.connect(url, function(err, db){
		if(err) throw err

			db.collection('data').insertOne(items, function(err, result){
			})	
			
			db.collection('data').find({}, { textarea : 1}).toArray(function(err, results){
				
				res.render('userpage', {data : results});
				
				db.close();

			})
	})
	
});



module.exports = router;
