import express from "express";
import pug from "pug";

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
 
    res.render('login');
})

app.get('/registrering', (req,res)=>{

    
    res.render('registrering');
})

app.get('/', (req,res)=>{
    res.render('forside')
})



// Start server
app.listen(port, () => {
    console.log(`Running on port ${port}`);
})