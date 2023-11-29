import express from "express";
const router = express.Router();
import bookingDBFunctions from "../service/BookingDBFunctions.js"
import loginDBFunctions from "../service/loginDBFunctions.js"
import administratorDBFunctions from "../service/administratorDBFunctions.js";

router.get('/', (req, res) => {
    if (req.session.isLoggedIn) {
        res.render('admin', { title: 'admin' });
    } else {
        res.redirect('/')
    }
})


router.post('/opretHold', async (req, res) => {
    if (req.session.isAdmin) {
        const {alder, holdNavn, instruktør, pris} = req.body
        const hold = {alder: alder, holdNavn: holdNavn, instruktør: instruktør, pris: pris}
        const svar = await administratorDBFunctions.getHold(holdNavn)
        if (svar) {
            res.status(210)
            res.end()
        } else {
            let id = await administratorDBFunctions.addHold(hold)
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
export default router;