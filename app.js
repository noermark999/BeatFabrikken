import express from "express";
import pug from "pug";
import expressSession from "express-session";
import { v4 as uuidv4 } from 'uuid';
import bodyParser from "body-parser";

import loginRoute from './routes/loginRoutes.js'
import registreringRoute from './routes/registreringRoute.js'

const app = express();

const port = "1234";

// View engine
app.set('view engine', 'pug');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'))
app.use(expressSession({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: false
}));
app.use(function(req, res, next) {
    let isLoggedIn = false;
    if (req.session && req.session.isLoggedIn) {
        isLoggedIn = true;
    }
    res.locals.isLoggedIn = isLoggedIn
    next()
})

app.use("/login", loginRoute)
app.use("/registrering", registreringRoute)

// ---------------------------------------------------------------------------------------------------

app.get('/', (req, res) => {
    res.render('forside', { title: 'Forside', isLoggedIn: res.locals.isLoggedIn });
});

app.get('/booking', (req, res) => {
    res.render('booking', { title: 'Booking' });
})

app.get('/logout', (req, res) => { //LOGOUT PAGE
    req.session.destroy()
    res.redirect('/')
})

app.get('/profil', async (req, res) => {
    if (req.session.isLoggedIn) {
        const username = req.session.username;
        const user = await loginDBFunctions.getUser(username);
        if (user) {
            // Send brugeroplysninger til PUG-skabelonen
            res.render('profil', { 
                title: 'Profil', 
                username: user.username,
                email: user.email,
                mobilnummer: user.mobilnummer
            });
        } else {
            // Hvis brugeren ikke findes i databasen
            res.redirect('/login');
        }
    } else {
        // Hvis brugeren ikke er logget ind
        res.redirect('/login');
    }
});




// Start server
app.listen(port, () => {
    console.log(`Running on port ${port}`);
})

export default { app }