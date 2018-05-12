var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
mongoose.connect('mongodb://princebatra:111111@ds123124.mlab.com:23124/authentication')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


db.once('open', function() {         
      // we're connected!
      console.log("Connected To MongoLab Cloud Database :p");
});

var userSchema = mongoose.Schema({
     name: String,
     email: String,
     password: String
});

var User = mongoose.model('User',userSchema);

app.get('/',function (req,res){
	console.log("welcome");
	res.sendFile(__dirname+'/form.html');
})

app.post('/data',function(req,res){
	var f_name = req.body.name;
	var f_email = req.body.email;
	var f_password = req.body.password;
	
	var user = new User({ name: f_name, email: f_email, password: f_password});
	user.save(function(err,data){
		if(err) return console.error(err);
		console.log(data);
	})
	res.send("Data Collected");
})

app.post('/data1',function(req,res){
var f_email = req.body.email;
var f_password = req.body.password;
console.log(f_email);
console.log(f_password);
})

app.get('/login',function(req,res){
	res.sendFile(__dirname+'/login.html');
	console.log('Welcome to Login Page');
})
app.get('/*',function (req,res){
	res.send('404 Error');
})
app.listen('3000');