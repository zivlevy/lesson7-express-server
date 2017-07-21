const express = require('express')
const app = express()
const todos = require('./todos')
const todosMongo = require('./todotmp')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http');


const server = http.createServer(app);


app.use(bodyParser.json());

app.use(cors());

app.use('/todos', todosMongo);



server.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})




