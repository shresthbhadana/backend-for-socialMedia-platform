const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const app = require("./app");
const {connectDB} = require("./config");
const http = require("http")
const {Server} =require('socket.io');
const server = http.createServer(app) 

const io = new Server(server,{
    cors : {
        origin  : "*",
        methods : ["GET","POST"]
    }

})
require("./sockets/chatSocket.js")(io)

connectDB()

  app.listen(9090,()=>{
    console.log("server is running at port 9090")
   })