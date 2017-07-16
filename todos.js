/**
 * Created by zivlevy on 13/07/2017.
 */
const express = require('express')
const router = express.Router()

todos = [{_id: 100, title: "first todo", completed: false}];

// define the home page route
router.get('/', function (req, res) {
    console.log('GET')
    res.json(todos)
})


router.post('/', function (req, res) {
    // get the json from the request
    let newtodo = req.body;
    newtodo._id = Math.random() * 1000000;

    // add the todo to todo list
    todos.push(newtodo);

    //return the new lost
    res.json(todos)

})

router.delete('/:id', function (req, res) {
    // get the id from the request
    let id = req.params.id

    //delete from todos
    for (i = 0; i < todos.length; i++) {
        if (todos[i]._id == id) {
            todos.splice(i, 1);
            break;
        }
    }
    //send back the list of  todos
    res.json(todos)
})

router.put('/:id', function (req, res) {
    // get the completed property json from the request
    let todofromclient = req.body;

    // find the todo with the proper id
    for (i = 0; i < todos.length; i++) {
        if (todos[i]._id == req.params.id) {
            todos[i].completed = todofromclient.completed
            break;
        }
    }

    //send back the list of  todos
    res.json(todos);
})


module.exports = router