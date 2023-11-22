import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    res.render('booking', { title: 'Booking' });
})

export default router;