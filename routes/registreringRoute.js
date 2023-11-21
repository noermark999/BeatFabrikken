import express from "express";
const router = express.Router();
import loginDBFunctions from "../service/loginDBFunctions.js"

router.get('/', (req, res) => {
    res.render('registrering', { title: 'Registrering', isLoggedIn: res.locals.isLoggedIn });
})

router.post('/', async (req, res) => {
    const { username, password, firstName, lastName, email, mobilnummer } = req.body;
    const user = { username: username.toLowerCase(), password: password, firstname: firstName, lastname: lastName, email: email, mobilnummer: mobilnummer }
    let id = await loginDBFunctions.addUser(user);
    res.redirect('/')
})

export default router;