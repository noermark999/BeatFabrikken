import express from "express";
const router = express.Router();
import bookingDBFunctions from "../service/BookingDBFunctions.js"
import loginDBFunctions from "../service/loginDBFunctions.js"

router.get('/', (req, res) => {
    res.render('admin', { title: 'admin' });
})

export default router;