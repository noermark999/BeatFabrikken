import express from "express";
import pug from "pug";
import loginDBFunctions from "./service/loginDBFunctions.js"
import expressSession from "express-session";
import { v4 as uuidv4 } from 'uuid';

const app = express();

const port = "1234";

// View engine
app.set('view engine', 'pug');

// Middleware
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

// Routes get, put, post, delete
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
})

app.post('/login', async (req, res) => { 
    const { username, password } = req.body
    if (await loginDBFunctions.checkLogInUser(username.toLowerCase(), password)) {
        req.session.isLoggedIn = true
        req.session.username = username
        res.redirect('/')
    } else {
        res.redirect('/login')
    }
})

app.get('/registrering', (req, res) => {
    res.render('registrering', { title: 'Registrering', isLoggedIn: res.locals.isLoggedIn });
})

app.get('/', (req, res) => {
    res.render('forside', { title: 'Forside', isLoggedIn: res.locals.isLoggedIn });
});

app.post('/registrering', async (req, res) => {
    const { username, password, firstName, lastName, email, mobilnummer } = req.body;
    const user = { username: username.toLowerCase(), password: password, firstname: firstName, lastname: lastName, email: email, mobilnummer: mobilnummer }
    let id = await loginDBFunctions.addUser(user);
    res.redirect('/')
})

app.get('/booking', (req, res) => {
    res.render('booking', { title: 'Booking' });
})

app.get('/logout', (req, res) => { //LOGOUT PAGE
    req.session.destroy()
    res.redirect('/')
})

app.get('/profil', (req, res) => {
    if (!req.session.isLoggedIn) {
        // Hvis brugeren ikke er logget ind, omdiriger til login-side
        res.redirect('/login');
    } else {
        // Hent brugeroplysninger fra session og vis profilsiden
        const { username, email, mobilnummer } = req.session.user;
        res.render('profil', {
            username: username,
            email: email,
            mobilnummer: mobilnummer
        });
    }
});


// Start server
app.listen(port, () => {
    console.log(`Running on port ${port}`);
})

export default { app }