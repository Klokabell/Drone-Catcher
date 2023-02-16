const {InViolation} = require("./violations")
const cheerio = require('cheerio')
const {duplicateHandler} = require('./duplicateHandler')

let serials = []


const serialThriller = async (data) => {
    const $ = cheerio.load(data, {
      xmlMode: true,
  })

    $("drone").each((i, drone) => {
              const posx = $(drone).find("positionX").text()
              const posy =  $(drone).find("positionY").text()
              if(InViolation(posx, posy)){

              let newdrone = 
                {
                  SN: $(drone).find("serialNumber").text(),
                  Time: Date.now()
                }
                if(serials.length === 0){serials.push(newdrone)}            
                else {
                  const duplicateDrone = serials.find(drone => drone.SN === newdrone.SN)
                  if(duplicateDrone){duplicateDrone.Time = newdrone.Time}
                  else serials.push(newdrone)
                }

              }
              
          })
   
    return serials
  } 

  module.exports = { serialThriller, serials }


  /*
  serials.length>0 ? (InViolation(posx, posy) && !(serials.some(({guy}) : 
  */