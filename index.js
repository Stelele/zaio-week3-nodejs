var express = require('express')
var toDoController = require( __dirname +'/controllers/todo-controller')
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var port = process.env.PORT || 3000;

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-y0lutlfv.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://zaio-week3-node-todo.herokuapp.com/',
    issuer: 'https://dev-y0lutlfv.auth0.com/',
    algorithms: ['RS256']
});

app.use(jwtCheck);

var app = express()

//set up template engine
app.set('view engine','ejs')

//static files
app.use('/assets',express.static(__dirname +'/assets'))

//fire controlers
toDoController(app,jwtCheck)

//listen to port
app.listen(port)
console.log(' You are listening to port 3000')

