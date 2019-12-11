var bodyParser = require('body-parser')
var mongoose = require('mongoose')

mongoose.connect('mongodb+srv://test:test@todo-9zzzh.mongodb.net/test?retryWrites=true&w=majority')

//Create a schema- this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
})

var Todo = mongoose.model('Todo', todoSchema)


//var data = [{item: 'get milk'},{item:'walk dog'}, {item:'kick some coding ass'}]
var urlencoder = bodyParser.urlencoded({extended:false})

module.exports = function(app, jwtCheck){
    app.get('/',function(req, res){
        Todo.find({},jwtCheck, function(err, data){
            if(err) throw err
            res.render('todo', {todos: data})
        })
    })

    app.post('/',jwtCheck, urlencoder, function(req,res){
        //get data from view and add it to mongodb

        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err

            res.json(data)
        })
        
    })

    app.delete('/:item',jwtCheck, function(req, res){
        Todo.find({item : req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if(err) throw err
            res.json(data)
        })
    })
}