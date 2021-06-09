const express = require('express');
const fs = require('fs')

const router = express.Router();

router.post('/', (req, res) => {
    const noOfseats = req.body
    console.log(noOfseats)
    try {
        const seats = [ ]
        for (var seatNo = 1; seatNo <= noOfseats["Seats"]; seatNo++) {
            seats.push(seatNo)
        }
        const data = {
            "noOfseats": noOfseats["Seats"],
            "bus": seats
        }
        // write the data in bus.json file

        fs.writeFile("./Api/bus.json", JSON.stringify(data))
        
         // write the empty object in tickets.json file
        
        fs.writeFile("./Api/tickets.json", JSON.stringify({}))
        res.send("bus created ")
       
    } catch (err) {
        console.error(err)
        return res.status(500).json({"msg":"server error"})
    }
})

module.exports = router;

