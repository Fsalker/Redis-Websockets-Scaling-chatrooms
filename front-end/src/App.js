import React, {useReducer} from 'react';
import { useGlobal } from "reactn"
import InsertUsername from "./InsertUsername.js"
import InsertChatroomName from "./InsertChatroomName"
import SelectSocketServer from "./SelectSocketServer.js"
import Chatroom from "./Chatroom.js"

const Element = () => {
  const [, forceUpdate] = useReducer(x => x)
  const [username, setUsername] = useGlobal("username")
  const [socketServerIndex, setSocketServerIndex] = useGlobal("socketServerIndex")
  const [chatroomName, setChatroomName] = useGlobal("chatroomName")

  if(username === undefined) {
    setUsername("Andrei")
    // setSocketServerIndex(1)
    setChatroomName("Deimos")
    forceUpdate()
  }
  
  if(username === undefined) return <InsertUsername/>
  if(socketServerIndex === undefined) return <SelectSocketServer/>
  if(chatroomName === undefined) return <InsertChatroomName/>

  return <Chatroom/>
}

export default Element;
