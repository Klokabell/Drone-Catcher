const express = require('express')
const axios = require('axios')
const { serialThriller } = require("./serials")
const { pilotInfo } = require('./pilotInfo')


const PORT = process.env.PORT || 3030
const app = express()

  // creates a two second interval to keep the data realtime

setInterval(() => {
    axios.get('http://assignments.reaktor.com/birdnest/drones', 
                {headers: {"Content-Type": 'application/x-www-form-urlencoded'}})
    .then(res => res.data)
    .then(res => serialThriller(res)) // function for retrieving the serial numbers from the drone XML data
    .then(res => pilotInfo(res)) // function for taking the serial number and returning the pilot's information
    .then(pinfo => { 
        app.set('pilots', pinfo)}) //set the information to the endpoint
    .catch(error => {
        if(error.code === 'ETIMEDOUT'){
            console.log("request time-out")
        }
        else console.log("Aw, error ", error)
    });
}, 2000)

app.get('/pilots', (req, res) => {
    res.send(app.get('pilots')) // when a get request is made to the pilots endpoint, it returns the list of pilots that violated the airspace
})


app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`)
})

