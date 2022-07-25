const express = require('express')
const app = express()
const port = 3000
const router = require('./routers/index')
const session = require('express-session')
var path = require('path');

app.use(
  session({
    secret:'Keep it secret',
    name:'uniqueSessionID',
    saveUninitialized:false
  })
)

app.use("/bootstrap", express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/', router);


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})