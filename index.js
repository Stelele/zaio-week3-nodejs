var express = require('express')
var toDoController = require( __dirname +'/controllers/todo-controller')

var app = express()

//set up template engine
app.set('view engine','ejs')

//static files
app.use('/assets',express.static(__dirname +'/assets'))

//fire controlers
toDoController(app)

//listen to port
app.listen(process.env.PORT || 3000)
console.log(' You are listening to port 3000')

