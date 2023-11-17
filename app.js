import express from "express";
import pug from "pug";
import admin from "firebase-admin";

import { getFirebaseconfig } from './firebaseconfig'

const app = express();

const port = "1234";

// Functions


// View engine
app.set('view engine', 'pug');

// Middleware

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static('assets'))

// Routes get, put, post, delete
app.get('/login', (req, res) => {
 
    res.render('login');
})


app.post('/registering', async (req, res) => {
    
})


// Start server
app.listen(port, () => {
    console.log(`Running on port ${port}`);
})