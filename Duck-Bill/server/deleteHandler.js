const deleter = (array) => {  // checks the drone to see if it has passed the 10 minute time limit and can be removed from the display
    const timelimit = 600000
console.log("deleter input ", array)
    array.forEach(drone => {
        if(drone.Time + timelimit <= Date.now()){
           drone.Expired = true
        }
    });

    return array.filter(drone => drone.Expired === false)
}

module.exports = { deleter }