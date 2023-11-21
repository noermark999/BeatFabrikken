import express from "express";
const router = express.Router();
import loginDBFunctions from "../service/loginDBFunctions.js"

router.get('/', async (req, res) => {
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

export default router;