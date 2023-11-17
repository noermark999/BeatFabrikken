import express, { response } from "express";
import pug from "pug";
import loginDBFunctions from "./service/loginDBFunctions.js"
import expressSession from "express-session";

const app = express();

const port = "1234";

// Functions


// View engine
app.set('view engine', 'pug');

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static('assets'))
app.use(expressSession({
    secret: '9acf12b4-a7a8-406d-8aba-d8f3b55b456d',
    resave: false,
    saveUninitialized: false
  }));

// Routes get, put, post, delete
app.get('/login', (req, res) => {
    
 
    res.render('login', {title: 'Login'});
})

app.post('/login', (request, response) =>{ // TJEKKER LOGIN VED HJÆLP AF VORES FUNCTION
    const {username, password} = request.body
    if (checkLogInUser(username, password)) {
        request.session.isLoggedIn = true
        request.session.username = username
    }
    response.redirect('/')
})


app.post('/login', (request, response) =>{ // TJEKKER LOGIN VED HJÆLP AF VORES FUNCTION
    const {username, password} = request.body
    if (checkLogInUser(username, password)) {
        request.session.isLoggedIn = true
        request.session.username = username
    }
    response.redirect('/')
})


app.get('/registrering', (req, res) => {


    res.render('registrering', { title: 'Registrering' });
})

app.get('/', (req, res) => {
    let isLoggedIn = false;
    if (req.session && req.session.isLoggedIn) {
        isLoggedIn = true;
    }
    res.render('forside', { title: 'Forside', isLoggedIn: isLoggedIn });
});

app.post('/registrering', async (req, res) => {
    const { username, password, email, mobilnummer } = req.body;
    if (username == "" || password == "" || email == "" || mobilnummer == "") {
        res.redirect('/registrering')
        console.log("Der mangles at indtaste noget");
    } else {
        const user = { username: username, password: password, email: email, mobilnummer: mobilnummer }
        let id = await loginDBFunctions.addUser(user);
        res.redirect('/')
    }
})

app.get('/logout', (request, response)=>{ //LOGOUT PAGE
    request.session.destroy()
    response.redirect('/')
}) 


// Start server
app.listen(port, () => {
    console.log(`Running on port ${port}`);
})