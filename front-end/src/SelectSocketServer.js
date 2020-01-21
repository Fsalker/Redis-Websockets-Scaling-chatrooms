import React from 'react';
import {useGlobal} from "reactn"

const Element = () => {
  const [, setSocketServerIndex] = useGlobal("socketServerIndex")

  return (
    <div>
      Select Socket server:
      <input type="Button" defaultValue="1" onClick = {() => setSocketServerIndex(1)}/>
      <input type="Button" defaultValue="2" onClick = {() => setSocketServerIndex(2)}/>
    </div>
  )
}

export default Element;