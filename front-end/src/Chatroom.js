import React, {useState} from 'react';
import {useGlobal} from "reactn"
import { getSocketConnection } from "./connect"

const Element = () => {
  const [username] = useGlobal("username")
  const [socketServerIndex] = useGlobal("socketServerIndex")
  const [chatroomName] = useGlobal("chatroomName")
  const [myMsg, setMyMsg] = useState("")

  const [io, setIo] = useState(null)
  const [messages, setMessages] = useState([])
  
  if(io === null) {
    const newIo = getSocketConnection(socketServerIndex, chatroomName)

    newIo.on("connect", () => {
      newIo.emit("set listened roomname", chatroomName)
    })

    setIo(newIo)
  } else {
    io.off("front end chatroom message")
    io.on("front end chatroom message", (chatroomMessageStr) => {
      // console.log("Received message: "+chatroomMessageStr)
      const chatroomMessage = JSON.parse(chatroomMessageStr)

      const crtDate = new Date()
      const datePrefix = `[${("0000"+crtDate.getHours()).slice(-2)}:${("0000"+crtDate.getMinutes()).slice(-2)}:${("0000"+crtDate.getSeconds()).slice(-2)}]`
      const finalMessage = `${datePrefix} ${chatroomMessage.username}: ${chatroomMessage.msg}`

      setMessages(messages.concat(finalMessage))
    })   
  }
  
  const messagesElement = messages.map( (msg, index) => <li key={index}>{msg}</li>)

  const sendMsg = () => {
    const fullMsg = {
      chatroomName,
      msg: myMsg,
      username,
      createdAt: new Date()
    }
    io.emit("chatroom message", fullMsg)
    // console.log("Sending the following message...")
    // console.log(fullMsg)

    setMyMsg("")
  }

  return (
    <div>
      <h1>Chatroom { chatroomName }</h1>
      <h4>Welcome, { username }.</h4>
      <p>The socket server is { socketServerIndex } </p>
      <ul style={{ listStyleType: "none", paddingLeft: "10px" }}>
        { messagesElement }
      </ul>
      <input 
        placeholder = "Type a message..."
        style = {{width: "100%", border: "3px solid black", marginBottom: "10px", padding: "4px", boxSizing: "border-box" }}
        value = {myMsg} 
        onKeyDown = {(e) => e.key === "Enter" ? sendMsg() : "" }
        onChange = {(e) => setMyMsg(e.target.value)} />
      <br/>
      <input type="Submit" onClick={ sendMsg }/>
    </div>
  )
}

export default Element;