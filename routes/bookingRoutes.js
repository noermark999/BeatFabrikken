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
        const booking = { dato: date, lokaleId: lokaleId, tid: tid, username: username }
        const svar = await bookingDBFunctions.getBooking(date, tid, lokaleId);
        if (svar) {
            res.status(210)
            res.end()
        } else {
            let id = await bookingDBFunctions.addBooking(booking)
            if (id != false) {
                res.status(200)
                res.end()
            } else {
                res.status(204)
                res.end()
            }
        }
    } else {
        res.status(208)
        res.end()
    }
})

router.get('/:dato/:lokale', async (req, res) => {
    let bookinger = await bookingDBFunctions.getBookingerForUgen(req.params.dato, req.params.lokale);
    res.json(bookinger);
})

router.get



export default router;