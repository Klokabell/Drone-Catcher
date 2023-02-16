const express = require('express')
const axios = require('axios')
const { serialThriller } = require("./Serials")
const { pilotInfo } = require('./pilotInfo')


const PORT = process.env.PORT || 3030
const app = express()

 
setInterval(() => {
    axios.get('http://assignments.reaktor.com/birdnest/drones', {headers: {"Content-Type": 'application/x-www-form-urlencoded'}})
    .then(res => res.data)
    .then(res => serialThriller(res))
    .then(res => pilotInfo(res))
    .then(pinfo => { 
        app.set('pilots', pinfo)})
    .catch(error => {
        if(error.code === 'ETIMEDOUT'){
            console.log("request time-out")
        }
        else console.log("Aw, error ")
    });
}, 2000)

app.get('/pilots', (req, res) => {
    res.send(app.get('pilots'))
})


app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`)
})

