const express = require('express')
const app = express()
const todos = require('./todos')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.use(cors());

app.use('/todos', todos);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

