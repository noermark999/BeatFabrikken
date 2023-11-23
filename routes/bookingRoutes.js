import express from "express";
const router = express.Router();
import bookingDBFunctions from "../service/BookingDBFunctions.js"
import loginDBFunctions from "../service/loginDBFunctions.js"

router.get('/', async (req, res) => {
    let lokaler = await bookingDBFunctions.getLokaler();
    res.render('booking', { title: 'Booking', lokaler: lokaler });
})

router.post('/', async (req, res) => {
    if (req.session.isLoggedIn) {
        const { date, lokaleId, tid } = req.body
        const username = req.session.username;
        const user = await loginDBFunctions.getUser(username);
        const booking = {dato: date, lokaleId: lokaleId, tid: tid, user: user}
        let id = await bookingDBFunctions.addBooking(booking)
        if (id != false) {
            res.status(200)
            res.end()
        } else {
            res.status(204)
            res.end()
        }
    } else {
        res.status(208)
        res.end()
    }

})

export default router;