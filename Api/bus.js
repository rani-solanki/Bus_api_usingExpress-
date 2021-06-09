const express = require('express');
const fs = require('fs')

const router = express.Router();

router.post('/', (req, res) => {
    const noOfseats = req.body
    console.log(noOfseats)
    try {
        const seats = [ ]
        for (var i = 1; i <= noOfseats["Seats"]; i++) {
            seats.push(i)
        }
        const data = {
            "noOfseats": noOfseats["Seats"],
            "bus": seats
        }

        fs.writeFile("./Api/bus.json",JSON.stringify(data), err => {
            if (err) console.log(err);
        });

        fs.writeFile("./Api/tickets.json", JSON.stringify({}), err => {
            if (err) console.log(err);
        });

        res.send("bus created ")
       

    } catch (err) {
        console.error(err)
        return res.status(500).json({"msg":"server error"})
    }
})

module.exports = router;

