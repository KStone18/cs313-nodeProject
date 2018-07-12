const express = require('express');
const PORT = process.env.PORT || 5000;
var bodyParser = require('body-parser');

// Database connection 
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL; //|| "postgres://klentonstone:password@localhost:5432/";
const pool  = new Pool({connectionString: connectionString});

express()
  .use(bodyParser.json())   // support json encoded bodies
  .use(express.static(__dirname + '/public'))
  .use(express.json())
  .use(express.urlencoded({extended: true}))
  .get('/', (req, res) => res.render('pages/index'))
  .get('/stream', handleStream)
  // .get('/site', handleSite)
  // .get('/journal', handleJournal)
  .post('/signup', postSignUp)
  .post('/login', postLogIn)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function handleStream(req, res) {
	var stream = req.query.stream;
	console.log("Looking for stream with name: " + stream);

	getStreamFromDB(stream, function(err, result) {
		if (err){
			console.log("ERROR: " + err);
		}else {
			res.json(result);
		}
	});
}

// function handleSite(req, res) {
	
// }

// function handleJournal(req, res) {
	
//}


function getStreamFromDB(stream, callback) {
	console.log("here");
	pool.query('SELECT * FROM stream WHERE name = $1::text', [stream], function(err, res) {
		if (err) {
			throw err;
		}else {
			// We got the reuslt for the db..
			console.log("Back from DB with: " + res.rows);

			var results = {
				status: 'success',
				list: res.rows
			};

			callback(null, results);
		}
	})
}


function postSignUp(req, res) {
	console.log("Signing up...");
	var userName = req.body.uName;
	var passwrd = req.body.psw;
	var rptpasswrd = req.body.pswrepeat;
	
	console.log(userName + ": " + passwrd + " : " + rptpasswrd); 

	// call to check user against Database. 
	//var sql = "SELECT id, username, password FROM app_user WHERE password=" + passwrd;

	//console.log(sql);


	res.redirect('/home.html');
}

function postLogIn(req, res) {
	console.log("Logging in...");
	res.redirect('/home.html');
}

