import config from "../config"

export const getSocketConnection = (socketServerIndex, chatroomName) => {
  const { SOCKET_HOST, SOCKET_PORTS } = config
  const SOCKET_PORT = !process.env.NAME ? SOCKET_PORTS[socketServerIndex - 1] : 1337

  const io = require("socket.io-client")(`http://${SOCKET_HOST}:${SOCKET_PORT}`)

  return io
}