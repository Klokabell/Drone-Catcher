const axios = require('axios')


const pilotURL = 'https://assignments.reaktor.com/birdnest/pilots/'

const pilotInfo = async (cereal) => { 

        let pilot = await Promise.all(cereal.map(element => { // runs a promise chain that requires promise.all to ensure there's no "undefined" items
            return new Promise((resolve) => {
                let url = pilotURL + element.SN // for every serial number, access the API endpoint for that pilot
                axios.get(url,{headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}})
                .then(res => {
                    let pinfo = res.data
                    resolve(pinfo) // returns the pilot information as an item on the pilot array
                })
            })  
        }))
    return pilot 
}
module.exports = { pilotInfo }

