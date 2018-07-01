const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded({extended: true}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/signup', postSignUp)
  .post('/login', postLogIn)
  .post('/search', searchData)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function postSignUp(req, res) {
	console.log("Signing up...");
}

function postLogIn(req, res) {
	console.log("Logging in...");
}

function searchData(req, res) {
	console.log("Searching Database...");
}