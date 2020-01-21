import React, {useState} from 'react';
import {useGlobal} from "reactn"

const Element = () => {
  const [localUsername, setLocalUsername] = useState("")
  const [, setUsername] = useGlobal("username")

  return (
    <div>
      Your username: <input onChange = {(e) => setLocalUsername(e.target.value)} value = { localUsername } />
      <br/><input type="Submit" onClick = {() => setUsername(localUsername)} defaultValue = "Done" />
    </div>
  )
}

export default Element;
