const axios = require('axios')


const pilotURL = 'https://assignments.reaktor.com/birdnest/pilots/'

const pilotInfo = async (cereal) => {

        let pilot = await Promise.all(cereal.map(element => { 
            return new Promise((resolve) => {
                let url = pilotURL + element.SN
                axios.get(url,{headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}})
                .then(res => {
                    let pinfo = res.data
                    resolve(pinfo)
                })
            })  
        }))
    return pilot 
}
module.exports = { pilotInfo }

