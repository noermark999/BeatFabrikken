import express from "express";
import loginDBFunctions from "../service/loginDBFunctions.js"
import profileDBFunctions from "../service/profileDBFunctions.js";

const router = express.Router();

//-------------------------------------------------------------------------------------//

// Route til at vise brugerprofilen, hvis brugeren er logget ind.
router.get('/', async (req, res) => {
  if (req.session.isLoggedIn) {
      const username = req.session.username;
      const user = await loginDBFunctions.getUser(username);
      if (user) {
          res.render('profil', { 
              title: 'Profil', 
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

//-------------------------------------------------------------------------------------//

// Route til at vise redigeringsformularen for brugerprofilen.
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

//-------------------------------------------------------------------------------------//

//route til opdatering af siden og databasen
router.post('/edit', async (req, res) => {
  if (req.session.isLoggedIn) {
      const { username } = req.session;
      const { email, mobilnummer } = req.body;

      try {
          await profileDBFunctions.updateUser(username, email, mobilnummer);

          req.session.successMsg = 'Dine ændringer er blevet gemt.';
          res.redirect('/profil');
      } catch (error) {
          req.session.errorMsg = 'Der opstod en fejl under opdateringen.';
          res.redirect('/profil/edit');
      }
  } else {
      // Brugeren er ikke logget ind og omdirigeres til login siden
      res.redirect('/login');
  }
});

//-------------------------------------------------------------------------------------//


export default router;