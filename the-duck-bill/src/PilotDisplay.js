const pilotDisplay = (pilots) => {
    if(pilots){
        return(
            <div>
                {pilots.map(pilot => (
                    <div key={pilot.pilotId} className="pilot">
                        <p>Name: {pilot.firstName + " " + pilot.lastName}</p>
                        <p>Phone Number: {pilot.phoneNumber}</p>
                        <p>Email: {pilot.email}</p>
                    </div>
                ))}
            </div>
        )
    }
    else{
        return (
            <div id="emptylist">
                <p>No pilots to show, yet...</p>
            </div>
        )
    }
}

export default pilotDisplay