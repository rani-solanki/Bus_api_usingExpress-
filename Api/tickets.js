const express = require('express');
const router = express.Router();
const jsonFile = require('./bus.json')
const fs = require('fs');

const seats = jsonFile["bus"]

router.post('/ticketBook', (req, res) => {
    const data = req.body
    var seat = data["seats"]

    try {
        var readFile = fs.readFileSync('./Api/tickets.json', 'utf8');
        var tickets = JSON.parse(readFile);

        for (var seatNo = 0; seatNo < seat.length; seatNo++) {
            if (Number(seat[seatNo]) > seats.length) {
                return res.status(401).json({ "msg": "these seats are not available in bus" })
            } if (seat[seatNo] in tickets) {
                return res.status(401).json({ "msg": "seats are already book" })
            }
        }

        for (var index = 0; index < seat.length; index++) {
            tickets[seat[index]] = data["user_id"]
        }

        fs.writeFile("./Api/tickets.json", JSON.stringify(tickets), err => {
            if (err) console.log(err);
        });

        return res.json({"tickets book": tickets})
            
    } catch (err) {
        console.error(err)
        res.status(500).json({ "msg": "server error",tickets})
    }
})

router.delete('/delete', (req,res)=> {
    const data = req.body
    console.log(data)
    var seat = data["seats"]
    var user_id = data["user_id"]

    try {
        var readFile = fs.readFileSync('./Api/tickets.json', 'utf8');
        var tickets = JSON.parse(readFile);

        for (var seat_no = 0; j < seat_no.length; seat_no++) {
            if (!(seat[seat_no] in tickets)) {
                return res.status(401).json({'msg':"this seat is not book yet"})
            }
        }

        for (var seat_num = 0; seat_num < seat.length; seat_num++) {
            if (!(user_id == tickets[seat[seat_num]])) {
                return res.status(401).json({'msg':"user is invalid"})
            } else {
                delete tickets[seat[seat_num]]
            }
        }
        tickets["empty"] = " "

        fs.writeFile("./Api/tickets.json", JSON.stringify(tickets), err => {
            if (err) console.log(err);
        });

        return res.json("tickets cancel")
        
    } catch (error) {
        console.error(err)
        return res.status(500).json({ "msg": "server error"})
    }
})

router.get('/status', (req, res) => {

    try {
        var readFile = fs.readFileSync('./Api/tickets.json', 'utf8');
        var tickets = JSON.parse(readFile);
        const tickets_status = { }
        console.log("S.No.      Staus ")
        for (var seat = 0; seat < seats.length; i++) {
            if (seats[seat] in tickets) {
                tickets_status[`${seats[seat]}`] = "booked"
            }
            else {
                tickets_status[`${seats[seat]}`] = "Not booked"
            }
        }
        return res.status(200).json({ "tickets_status": tickets_status})
    }catch(err) {
        console.error(err)
        return res.status(500).json({ "msg": "server error" })
    }
})


module.exports = router