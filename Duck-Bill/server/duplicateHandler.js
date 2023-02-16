function duplicateHandler(serials, SN) {

    return serials.some(drone => {
         drone.SN === SN
    });
}

module.exports = { duplicateHandler }