const mongoose = require("mongoose")

const mongoURL = 'mongodb://127.0.0.1:27017/hotels'
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected mongo db.');
})
db.on('error', () => {
    console.log(' mongo db connection error hello.');
})
db.on('disconnected', () => {
    console.log('Disconnected mongo db.');
})
module.exports = db