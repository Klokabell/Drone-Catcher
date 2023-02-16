const {InViolation} = require("./violations")
const cheerio = require('cheerio')
const { deleter } = require('./deleteHandler')

let serials = []


const serialThriller = async (data) => {
    const $ = cheerio.load(data, {
      xmlMode: true,
  })

  console.log(serials.length)

    $("drone").each((i, drone) => {
              const posx = $(drone).find("positionX").text()
              const posy =  $(drone).find("positionY").text()
              if(InViolation(posx, posy)){

              let newdrone = 
                {
                  SN: $(drone).find("serialNumber").text(),
                  Time: Date.now(),
                  Expired: false
                }
                if(serials.length === 0){serials.push(newdrone)}            
                else {
                  console.log("running else here")
                  const duplicateDrone = serials.find(drone => drone.SN === newdrone.SN)
                  if(duplicateDrone){duplicateDrone.Time = newdrone.Time}
                  else serials.push(newdrone)
                }

              }
              
                })
              if(serials.length>0){
                console.log("deleter value is ", deleter(serials))
                  serials = deleter(serials) 
                }
    console.log(serials.length)
    return serials;
  } 

  module.exports = { serialThriller, serials }
