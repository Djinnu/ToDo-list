const { response } = require('express')
const express = require('express')
const app = express()
const PORT = 8000
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())    

app.get('/', (req, res) => {
    // const toDoItems = await db.collection('todos').find().toArray()
    // const itemsLeft = await db.collection('todos').countDocuments({completed: false})
    // response.render('index.ejs', { items: toDoItems, left: itemsLeft })
    db.collection('todos').find().toArray()
    .then(data => {
        db.collection('todos').countDocuments({completed: false})
        .then(itemsLeft => {
            res.render('index.ejs', { items: data, left: itemsLeft })
        })
    })
    .catch(error => console.error(error))
})

app.post('/addTodo', (req, res) => {
    db.collection('todos').insertOne({thing: req.body.todoItem, completed: false})
    .then(result => {
        console.log('Todo added')
        res.redirect('/')
    })
    .catch(error => console.log(error))
})

app.put('/markCompleted', (req, res) => {
    db.collection('todos').updateOne({thing: req.body.itemFromJS}, {
        $set: {
            completed: true
        }
    }, {
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Completed')
        res.json('Marked Completed')
    })
    .catch(error => console.error(error))
})

app.put('/markUnComplete', (req, res) => {
    db.collection('todos').updateOne({thing: req.body.itemFromJS}, {
        $set: {
            completed: false
        }
    }, {
       sort: {_id: -1},
       upsert: false 
    })
    .then(result => {
        console.log('completed class removed')
        res.json('completed class removed')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteItem', (req, res) => {
    db.collection('todos').deleteOne({thing: req.body.itemFromJS})
    .then(result => {
        console.log('Todo Deleted')
        res.json('Todo Deleted')
    })
    .catch(error => console.error(error))
})


app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})