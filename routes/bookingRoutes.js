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
                    fastbooking.dato = loopdate
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

router.post('/eventbooking', async (req, res) => {
    if (req.session.isLoggedIn) {
        if (req.session.isAdmin) {
            const { date, lokaleId, tid, eventNavn, antalDeltagere, slutDato, sluttid } = req.body

            let startDate = new Date();
            startDate.setHours(tid.substring(0, 2));
            startDate.setFullYear(date.substring(0, 4), date.substring(5, 7), date.substring(8, 10))
            startDate.setMonth(startDate.getMonth() - 1)

            let slutDate = new Date();
            slutDate.setHours(sluttid.substring(0, 2));
            slutDate.setFullYear(slutDato.substring(0, 4), slutDato.substring(5, 7), slutDato.substring(8, 10))
            slutDate.setMonth(slutDate.getMonth() - 1)
            slutDate.setHours(slutDate.getHours() - 1)

            let idag = new Date();

            let twoWeeksInMiliseconds = 1209600000;

            let loopdate = new Date(startDate);

            let eventBooking = { dato: date, lokaleId: lokaleId, tid: tid, username: eventNavn }

            let done = false;
            let index = 0;
            const bookinger = await bookingDBFunctions.getBookinger();
            while (!done) {
                //Der sker en fejl her. Tror også der sker en fejl i metoden ovenover pga det samme. Fejlen er at der ikke bliver chekket på alle nuværende bookinger for de nye bookinger der kommer.
                //Der skal på en eller anden måde checkes om der er en booking lige præcis der hvor man vil lave en ny booking, helst uden at der sker for mange loops. Den eneste måde jeg
                //lige kan tænke at det kan virke er ved at for hvert nye booking at loope igennem alle nuværende bookinger for at se om der er en som er ens. Men der må være en nemmere måde.
                //tænk over om det findes. måske en bookinger.map() eller noget i den retning. ved det ikke.
                console.log("Alle bookinger i db: ");
                console.log(bookinger[index]);
                console.log("Booking der skal laves: ");
                console.log(eventBooking);
                if (bookinger[index].dato == eventBooking.dato && bookinger[index].lokaleId == eventBooking.lokaleId
                    && bookinger[index].tid == eventBooking.tid && bookinger[index].username == eventBooking.username) {
                    if (loopdate.getTime() < (idag.getTime() + twoWeeksInMiliseconds)) {
                        res.status(210)
                        res.end()
                    } else {
                        index++;
                        console.log("Som test sletter vi booking med id: " + bookinger[index].bookingId);
                        //bookingDBFunctions.deleteBooking(bookinger[index].bookingId)
                    }
                }
                if (loopdate.getTime() > slutDate.getTime()) {
                    done = true;
                } else {
                    eventBooking.tid = loopdate.getHours() + ":00"
                    eventBooking.dato = loopdate.toISOString().slice(0, 10)
                    loopdate.setHours(loopdate.getHours() + 1)
                }
            }
            eventBooking.dato = startDate;
            let ids = await bookingDBFunctions.addEventBooking(eventBooking, startDate, slutDate);
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