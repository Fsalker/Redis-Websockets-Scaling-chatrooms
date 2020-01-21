import React, {useState} from 'react';
import {useGlobal} from "reactn"

const Element = () => {
  const [localChatroomName, setLocalChatroomName] = useState("")
  const [, setChatroomName] = useGlobal("chatroomName")

  return (
    <div>
      Chatroom name: <input onChange = {(e) => setLocalChatroomName(e.target.value)} value = { localChatroomName } />
      <br/><input type="Submit" onClick = {() => setChatroomName(localChatroomName)} defaultValue = "Done" />
    </div>
  )
}

export default Element;
