// config
const HOST = process.env.NAME ? "host.docker.internal" : "localhost"
const PORT = 1337
// const SOCKETIO_PORT = 1338
const REDIS_PORT = 3100
const REDIS_HOST = HOST


// redis
const redis = require("redis")
const bluebird = require("bluebird")
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const subClient = redis.createClient(REDIS_PORT, REDIS_HOST)
const pubClient = redis.createClient(REDIS_PORT, REDIS_HOST)
const redisClient = redis.createClient(REDIS_PORT, REDIS_HOST)

const chatroomHandler = (chatroomMessage) => {
  const fullMsg = JSON.parse(chatroomMessage)
  // console.log(`Received a new message: ${fullMsg}`)
  io.to(fullMsg.chatroomName).emit("front end chatroom message", chatroomMessage)
  // console.log(`Forwarded it to ${fullMsg.chatroomName}`)
}

const redisMessageHandler = (channel, message) => {
  console.log(`Received a message from Redis`)
  if(channel === "chatrooms") {
    return chatroomHandler(message)
  }
}


// web server
const express = require("express")
const app = express()

app.get("/", (req, res) => res.end("Hello there!"))
// app.get("/message/:content", async(req, res) => {  
//   try {
//     const { content: messageBody } = req.params
//     const { username } = req.headers
//     const crtDate = new Date()
//     const datePrefix = `[${("0000"+crtDate.getHours()).slice(-2)}:${("0000"+crtDate.getMinutes()).slice(-2)}:${("0000"+crtDate.getSeconds()).slice(-2)}]`
//     const finalMessage = `${datePrefix} ${username}: ${messageBody}`

//     const messages = await redisClient.lpushAsync("messages", finalMessage)
//     res.json(finalMessage)
//   } catch(e) {
//     console.error(e)
//     res.status(500).end()
//   }
// })
// app.get("/messages", async(req, res) => {
//   try {
//     const messages = await redisClient.lrangeAsync("messages", 0, -1)
//     console.log(messages)
//     res.json(messages)
//   } catch(e) {
//     console.error(e)
//     res.status(500).end()
//   }
// })
const httpServer = app.listen(PORT)


// socket io
const io = require("socket.io")(httpServer)

setInterval(() => { 
  io.emit("sal", new Date())
}, 500)

const SocketIdToRoomname = []
io.on("connection", (socket) => {
  socket.on("set listened roomname", (newRoomName) => {
    const crtRoomName = SocketIdToRoomname[socket.id]
    if(crtRoomName !== undefined) {
      socket.leave(crtRoomName)
    }
    socket.join(newRoomName)
    console.log(`Socket ${socket.id} is now listening to ${newRoomName}`)
  })

  socket.on("chatroom message", async(fullMsg) => {
    try {
      console.log("Received message from a client")
      // console.log(`Emitting to ${fullMsg.chatroomName} message ${fullMsg.msg}`)
      // io.to(fullMsg.chatroomName).emit("front end chatroom message", fullMsg.msg)

      const redisMsg = { // This adapter is redundant, but we're keeping it for clarity
        chatroomName: fullMsg.chatroomName,
        msg: fullMsg.msg,
        username: fullMsg.username,
        createdAt: fullMsg.createdAt
      }

      await pubClient.publishAsync("chatrooms", JSON.stringify(redisMsg))
    } catch(e) {
      console.error(e)
    }
  })
})

// main
;(async() => {
  try {
    console.log(`App listening on PORT=${PORT}`)
    console.log(`Name = ${process.env.NAME}`)

    // Subscribe to Redis
    subClient.on("message", redisMessageHandler)
    await subClient.subscribeAsync("chatrooms")

    const myMsg = {
      chatroomName: "Hatz",
      msg: `I am ${process.env.NAME} and I have connected to Redis!`
    }
    await pubClient.publishAsync("chatrooms", JSON.stringify(myMsg))
  } catch(e) {
    console.error(e)
  }
})()