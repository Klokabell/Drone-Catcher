const deleter = (array) => {
    const timelimit = 10000
console.log("deleter input ", array)
    array.forEach(drone => {
        if(drone.Time + timelimit <= Date.now()){
           drone.Expired = true
        }
    });

    return array.filter(drone => drone.Expired === false)
}

module.exports = { deleter }