# Drone-Catcher

Based on an assignment for Reaktor, this application uses node to fetch XML data, parses it and use the result to fetch JSON data. 
It passes this to the front end and, using React, provides a list of contact details that updates itself every 2 seconds.


To run, in Duck Bill, where the server is, use " npm run dev " in the terminal
        in the-duck-bill, where the frontend is, use " npm start " in the terminal


The code performs the majority of the work in the backend. It uses axios, express and cheerio to fetch, parse and send the data.

- The core code is found in index.js and runs in a setInterval function every 2 seconds
- Then it retrieves the XML file from 'http://assignments.reaktor.com/birdnest/drones' using axios and begins a promise chain.
- The chain takes the response.data and passes it to the serialThriller() function to extract all the serial numbers from the drones scanned.
    - serialThriller uses inViolation as a callback to determine whether the drone is in violation of the protected airspace based on the x&y coordinates
    - if yes, it creates a new object with the serial number and the time it occurred as properties. 
    - it compares the serial number to the ones found on the serial array already, if any, and if there are any matching it replaces the array drone.Time value
      with the one found on the newDrone, keeping the yet to be introduced 10 minute from starting before the drone leaves.
    - if in violation and not a duplicate, it simply pushes the serial to the array.
- With the serial array passed along the chain it becomes the argument passed to pilotInfo, where the serials are used to complete a url that returns that
  particular pilot's name and contact details in JSON.
    - pilotInfo maps these responses into an array and returns the name, number and email using the pilotId as the key. The promise.all is used to wait for the 
      array of promises to complete before resolving with the pinfo, the pilot's information as an object.
- this data is returned and express sets the pilots array as the response for get requests sent to the "/pilots" endpoint
- the frontend takes over, using the "/pilots" endpoint it gets the data, returning the pilot details array, and proceeds to process the objects and displaying them
  in the browser
