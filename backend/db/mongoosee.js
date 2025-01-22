require('dotenv').config()
const mongoose = require('mongoose')

// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/user-management';
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB')
}).catch(() => {
    console.log('Error connecting to mongoDB:', err)
})