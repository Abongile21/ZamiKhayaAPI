require('dotenv').config()

const db = {
    uri: process.env.MONGO_URI
}

module.exports = db