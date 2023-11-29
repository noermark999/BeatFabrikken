import express from "express";
const router = express.Router();
import bookingDBFunctions from "../service/BookingDBFunctions.js"
import loginDBFunctions from "../service/loginDBFunctions.js"
import administratorDBFunctions from "../service/administratorDBFunctions.js"

router.get('/', async (req, res) => {
    let lokaler = await bookingDBFunctions.getLokaler();
    let hold = await administratorDBFunctions.getAlleHold();
    res.render('booking', { title: 'Booking', lokaler: lokaler, hold: hold });
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

router.post('/fastbooking', async (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.isAdmin) {
            const { date, lokaleId, tid, hold, slutDato } = req.body

            let startDate = new Date();
            startDate.setFullYear(date.substring(0, 4), date.substring(5, 7), date.substring(8, 10))
            startDate.setMonth(startDate.getMonth() - 1)

            let slutDate = new Date();
            slutDate.setFullYear(slutDato.substring(0, 4), slutDato.substring(5, 7), slutDato.substring(8, 10))
            slutDate.setMonth(slutDate.getMonth() - 1)

            let loopdate = new Date(startDate);

            const fastbooking = { dato: date, lokaleId: lokaleId, tid: tid, username: hold }
            let done = false;
            let index = 0;
            const bookinger = await bookingDBFunctions.getBookinger();
            while (!done) {
                if (bookinger[index].dato == fastbooking.dato && bookinger[index].lokaleId == fastbooking.lokaleId
                    && bookinger[index].tid == fastbooking.tid && bookinger[index].username == fastbooking.username) {
                    res.status(210)
                    res.end()
                }
                if (loopdate.getTime() > slutDate.getTime()) {
                    done = true;
                } else {
                    fastbooking.dato = loopdate.getFullYear() + "-" + (loopdate.getMonth() + 1) + "-" + loopdate.getDate()
                    loopdate.setDate(loopdate.getDate() + 7)
                }
            }
            //Her kommer den kun til hvis der kan bokkes alle uger
            let ids = await bookingDBFunctions.addFastBooking(fastbooking, startDate, slutDate);
            if (ids) {
                res.status(200)
                res.end()
            } else {
                res.status(204)
                res.end()
            }
        } else {
            res.status(212)
            res.end()
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