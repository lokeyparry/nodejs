const express = require('express')

const app = express()
const db = require("./db")
const bodyParser = require('body-parser')
app.use(bodyParser.json())


const personRoutes = require('./routes/PersonRoutes')
app.use('/person', personRoutes)
const menuRoutes = require('./routes/menuRoutes')
app.use('/menu', menuRoutes)



// middle ware function
const logRequest = (req, res, next) => {
    console.log(`[${(new Date())}] Request made to : ${req.originalUrl}`);
    next() // move on next phase 
}
app.get("/", logRequest, function(req, res) {
    res.send("Welcome to our Home.")
})




app.listen(6000, () => {
    console.log("app running at port 6000")
})