const express = require('express');
const PORT = process.env.PORT || 5000;
var bodyParser = require('body-parser');

// Database connection 
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || "postgres://nodeuser:password@localhost:5432/postgres";
const pool  = new Pool({connectionString: connectionString});

express()
  .use(bodyParser.json())   // support json encoded bodies
  .use(express.static(__dirname + '/public'))
  .use(express.json())
  .use(express.urlencoded({extended: true}))
  .get('/', (req, res) => res.render('pages/index'))
  .get('/stream', handleStream)
  .get('/allStreams', handleAllStreams)
  .get('/infoOfStream', getInfoOfStream)
  // .get('/site', handleSite)
  // .get('/journal', handleJournal)
  .post('/signup', postSignUp)
  .post('/login', postLogIn)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


function getInfoOfStream(req, res) {
	var stream = req.query.stream;
	//console.log("StreamA = " + stream);
	getStreamInfo(stream, function(err, result) {
		if (err) {
			throw err;
		}else {
			console.log("returned object");
			res.json(result);
		}
	})
}

function handleAllStreams(req, res) {
	//console.log("I GOT HERE")
 	getAllStreamsFromDB(function(err, result) {
 		if (err) {
 			throw err;
 		}else {
 			res.json(result);
 		}
 	});
}

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

function getStreamInfo(stream, callback) {
	console.log("Getting information for stream...");
	
	pool.query('SELECT s.name as stream_name, si.name as site_name, si.description, si.latitude, si.longitude, j.name, j.date, j.content FROM stream s INNER JOIN site si ON si.stream_id = s.id INNER JOIN journal j ON j.site_id = si.id WHERE s.name = $1::text', [stream], function(err, res) {
		if (err) {
			throw err;
		}else {
			console.log("Back from Db....");

			console.log("Rows: " + res.rows);
			var results = {
				status : 'success',
				list : res.rows
			};

			callback(null, results);

		}
	})
}

function getAllStreamsFromDB(callback) {
	console.log("inside all streams...");
	pool.query('Select name FROM stream', function(err, res) {
		if (err) {
			throw err; 
		}else {
			console.log("Back from DB with: " + res.rows);

			var results = {
				status: 'success', 
				list: res.rows
			};
			callback(null, results);
		}
	})
}

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

