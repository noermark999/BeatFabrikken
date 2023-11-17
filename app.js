import express, { response } from "express";
import pug from "pug";
import loginDBFunctions from "./service/loginDBFunctions.js"


const app = express();

const port = "1234";

// Functions


// View engine
app.set('view engine', 'pug');

// Middleware

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static('/assets'))

// Routes get, put, post, delete
app.get('/login', (req, res) => {
 
    res.render('login', {title: 'Login'});
})

app.get('/registrering', (req,res)=>{

    
    res.render('registrering', {title: 'Registrering'});
})


app.post('/registrering', async (req, res) => {
    
})


app.get('/', (req,res)=>{
    res.render('forside', {title: 'Forside'})
})

app.post('/registrering', async (req, res) => {
    const {username, password, email, mobilnummer} = req.body;
    const user = {username: username, password: password, email: email, mobilnummer: mobilnummer}
    let id = await loginDBFunctions.addUser(user);
    res.redirect('/')
})

/*app.get('/logout', (request, response)=>{ //LOGOUT PAGE
    request.session.destroy()
    response.redirect('/')
}) */


// Start server
app.listen(port, () => {
    console.log(`Running on port ${port}`);
})

export default {app}