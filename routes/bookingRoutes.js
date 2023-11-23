import express from "express";
const router = express.Router();
import bookingDBFunctions from "../service/BookingDBFunctions.js"


router.get('/', async (req, res) => {
    let lokaler = await bookingDBFunctions.getLokaler();
    res.render('booking', { title: 'Booking', lokaler: lokaler});
})

export default router;