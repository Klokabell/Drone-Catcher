const sortDetails = (pilotsFull) =>{

    let pilots = pilotsFull.map(pilot => {
        const { firstName, lastName, phoneNumber, email } = pilot
        const pilotDetails = { firstName, lastName, phoneNumber, email }
        return pilotDetails
    })

    console.log(pilots)
    return pilots
}

export default sortDetails

