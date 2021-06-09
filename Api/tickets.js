const express = require('express');
const router = express.Router();
const jsonFile = require('./bus.json')
const fs = require('fs');
const { route } = require('./bus');

const seats = jsonFile["bus"]

router.post('/ticketBook', (req, res) => {
    const data = req.body
    var seat = data["seats"]

    try {
        var readFile = fs.readFileSync('./Api/tickets.json', 'utf8');
        var tickets = JSON.parse(readFile);

        for (var j = 0; j < seat.length; j++) {
            if (Number(seat[j]) > seats.length) {
                return res.status(401).json({ "msg": "these seats are not available in bus" })
            } if (seat[j] in tickets) {
                return res.status(401).json({ "msg": "seats are already book" })
            } var readFile = fs.readFileSync('./Api/tickets.json', 'utf8');
            var tickets = JSON.parse(readFile);
        }

        for (var i = 0; i < seat.length; i++) {
            tickets[seat[i]] = data["user_id"]
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

        for (var j = 0; j < seat.length; j++) {
            if (!(seat[j] in tickets)) {
                return res.status(401).json({'msg':"this seat is not book yet"})
            }
        }

        for (var i = 0; i < seat.length; i++) {
            if (!(user_id == tickets[seat[i]])) {
                return res.status(401).json({'msg':"user is invalid"})
            } else {
                delete tickets[seat[i]]
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
        for (var i = 0; i < seats.length; i++) {
            if (seats[i] in tickets) {
                tickets_status[`${seats[i]}`] = "booked"
            }
            else {
                tickets_status[`${seats[i]}`] = "Not booked"
            }
        }
        return res.status(200).json({ "tickets_status": tickets_status})
    }catch(err) {
        console.error(err)
        return res.status(500).json({ "msg": "server error" })
    }
})


module.exports = router