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

// Routes get, put, post, delete
app.get('/login', (req, res) => {
 
    res.render('login');
})

// Start server
app.listen(port, () => {
    console.log(`Running on port ${port}`);
})