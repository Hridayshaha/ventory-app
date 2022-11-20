// Module Import
const http = require('http');
const app = require('./app/app');
require('dotenv').config();
const connectDb = require('./db/connectDb')

// Server configuration
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
const URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/ventory-app"
const dbMessage = "Database Connection established..."


// Connect Db and Start Server
connectDb(URL,dbMessage, () => {
    return server.listen(PORT, () => {
        console.log('listening on port ' + PORT + "...");
    });
})



