const mongoose = require("mongoose")


const mongoURL = 'mongodb+srv://parvejansari8417000:Onax3n8r29RHwOkR@cluster0.v9mr8z7.mongodb.net'
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