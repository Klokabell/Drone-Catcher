import React, { useEffect, useState } from 'react'
import './App.css';
import axios from "axios"
import sortDetails from './cleanUp.js'
import pilotDisplay from './PilotDisplay';


function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    const interval = setInterval(() =>{
      axios("/pilots")
      .then(response => response.data)
      .then((response) => sortDetails(response))
      .then(res => setData(res))
    }, 2000)
    return () => {clearInterval(interval)}
  }, [])

  return(
    <div>
      <h1 className='titles'>Naughty List</h1>

        <div className='pilots'>{pilotDisplay(data)}</div>
    </div>

  )
}
export default App;
