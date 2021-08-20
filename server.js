const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql2')

// App config
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send('hello')
})

app.all('*', (req, res) => res.sendStatus(404))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})