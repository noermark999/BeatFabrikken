import express, { response } from "express";
import pug from "pug";
import loginDBFunctions from "./service/loginDBFunctions.js"
import expressSession from "express-session";
import { v4 as uuidv4 } from 'uuid';
import session from "express-session";

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

app.post('/login', async (request, response) => { // TJEKKER LOGIN VED HJÆLP AF VORES FUNCTION
    const { username, password } = request.body
    if (await loginDBFunctions.checkLogInUser(username, password)) {
        request.session.isLoggedIn = true
        request.session.username = username
        response.redirect('/')
    } else {
        response.redirect('/login')
    }
})

app.get('/registrering', (req, res) => {
    res.render('registrering', { title: 'Registrering', isLoggedIn: res.locals.isLoggedIn });
})

app.get('/', (req, res) => {
    res.render('forside', { title: 'Forside', isLoggedIn: res.locals.isLoggedIn });
});

app.post('/registrering', async (req, res) => {
    const { username, password, email, mobilnummer } = req.body;
    const user = { username: username, password: password, email: email, mobilnummer: mobilnummer }
    let id = await loginDBFunctions.addUser(user);
    res.redirect('/')
})

app.get('/logout', (request, response) => { //LOGOUT PAGE
    request.session.destroy()
    response.redirect('/')
})


// Start server
app.listen(port, () => {
    console.log(`Running on port ${port}`);
})

export default { app }