const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB(uri) {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const connectOptions = {
      // fail fast so serverless functions don't hang on network issues
      serverSelectionTimeoutMS: process.env.MONGO_SERVER_SELECTION_TIMEOUT_MS ? parseInt(process.env.MONGO_SERVER_SELECTION_TIMEOUT_MS) : 5000,
      connectTimeoutMS: process.env.MONGO_CONNECT_TIMEOUT_MS ? parseInt(process.env.MONGO_CONNECT_TIMEOUT_MS) : 5000,
      // keep default useNewUrlParser/useUnifiedTopology behaviour from mongoose v6+
    };

    cached.promise = mongoose.connect(uri, connectOptions).then(m => m).catch(err => {
      // clear the promise so future calls may retry
      cached.promise = null;
      throw err;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;
