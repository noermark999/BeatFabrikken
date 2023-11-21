import express from "express";
const router = express.Router();
import loginDBFunctions from "../service/loginDBFunctions.js"
import profileDBFunctions from "../service/profileDBFunctions.js";

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

router.get('/edit', async (req, res) => {
  if (req.session.isLoggedIn) {
      const username = req.session.username;
      const user = await loginDBFunctions.getUser(username);
      if (user) {
          res.render('editProfile', {
              title: 'Rediger Profil',
              username: user.username,
              email: user.email,
              mobilnummer: user.mobilnummer
          });
      } else {
          res.redirect('/login');
      }
  } else {
      res.redirect('/login');
  }
});


router.put('/edit', async (req, res) => {
  if (req.session.isLoggedIn) {
      const username = req.session.username;
      const { email, mobilnummer } = req.body;

      try {
          // Opdater brugeroplysninger i databasen
          await profileDBFunctions.updateUser(username, email, mobilnummer);

          // Omdiriger til profil siden med opdaterede oplysninger
          res.redirect('/profile');
      } catch (error) {
          console.error('Error updating user:', error);
          res.redirect('/editProfile');
      }
  } else {
      res.redirect('/login');
  }
});



export default router;