const {InViolation} = require("./violations")
const cheerio = require('cheerio')
const { deleter } = require('./deleteHandler')

let serials = []


const serialThriller = async (data) => {
    const $ = cheerio.load(data, {  // uses cheerio to parse the data more easily
      xmlMode: true,
  })

  console.log(serials.length)

    $("drone").each((i, drone) => {
              const posx = $(drone).find("positionX").text() // sets the drone x, y positions and sends them to the InViolation component
              const posy =  $(drone).find("positionY").text()
              if(InViolation(posx, posy)){ // if the function returns true, they are in violation and creates a new drone

              let newdrone = 
                {
                  SN: $(drone).find("serialNumber").text(),
                  Time: Date.now(),
                  Expired: false
                }
                if(serials.length === 0){serials.push(newdrone)}  // checks to see if the drone is the first in the list, unique or still in violation
                else {
                  console.log("running else here")
                  const duplicateDrone = serials.find(drone => drone.SN === newdrone.SN)
                  if(duplicateDrone){duplicateDrone.Time = newdrone.Time} // resets the 10 minute timer by resetting the drone's Time value
                  else serials.push(newdrone)
                }

              }
              
                })
              if(serials.length>0){
                  serials = deleter(serials) 
                }
    console.log(serials.length) // to check there are drone values being received
    return serials;
  } 

  module.exports = { serialThriller, serials }
