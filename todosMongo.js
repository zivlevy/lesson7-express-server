/**
 * Created by zivlevy on 18/07/2017.
 */
const express = require('express')
const router = express.Router()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo');

const db = mongoose.connection;
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log(' connected to mongodb')
    // we're connected!
});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TodosSchema = new mongoose.Schema({
    id: ObjectId,
    title: {type: String, index: true},
    completed: Boolean,
    date: Date
});

const Todo = mongoose.model('Todo', TodosSchema);

// define the home page route
router.get('/', function (req, res) {
    Todo.find()
        .then((todos) => {
            res.json(todos)
        })
})


router.post('/', function (req, res) {
    // get the json from the request
    let newtodo = req.body;
    // req.body.date = new Date();

    // add the todo
    Todo.create(newtodo).then(result=>{
        console.log(result)
        res.json(result)
    })

})

router.delete('/:id', function (req, res) {
    // get the id from the request
    let id = req.params.id

    Todo.findByIdAndRemove(id).then(todo=>{
        res.json(todo)
    })

})

router.put('/:id', function (req, res) {
    // get the id from the request
    let id = req.params.id

    // get the completed property json from the request
    let todofromclient = req.body;

    Todo.findByIdAndUpdate(id,todofromclient).then(result=>{
        res.json(result);
    })

})


module.exports = router