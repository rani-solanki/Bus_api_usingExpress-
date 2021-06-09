const express = require('express')
const app = express()
app.use(express.json({ extended: false }));
app.use('/bus', require('./Api/bus'));
app.use('/tickets', require('./Api/tickets'));

app.get('/', function (req, res) {
    res.send('Hello World')
})

console.log("server is runing")
app.listen(5000)

