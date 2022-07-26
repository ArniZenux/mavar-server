import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import bodyParse from 'body-parser';
import cors from 'cors'; 

//import passport from './auth/login.js';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { comparePasswords, findByUsername, findById } from './auth/users.js';

//import { router as adminRoute } from './auth/auth.js';
import { router as tulkurRoute } from './api/tulkur.js';
import { router as projectRoute } from './api/project.js';

dotenv.config();

const {
  PORT: port,
  SESSION_SECRET: sessionSecret,
  DATABASE_URL: connectionString,
} = process.env;

if ( !connectionString || !sessionSecret )  {
  console.error('Vantar ConnectionString eða SessionSecret í env - app');
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));

//*******************************************************************/
//                                                                   /
//*******************************************************************/
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: sessionSecret,
    maxAge: 20 * 1000, // 20 sek
}));

async function strat(username, password, done) {
  try {
    const user = await findByUsername(username);

    if (!user) {
      return done(null, false);
    }

    // Verður annað hvort notanda hlutur ef lykilorð rétt, eða false
    const result = await comparePasswords(password, user.password);
    return done(null, result ? user : false);
  } catch (err) {
    console.error(err);
    return done(err);
  }
}

passport.use(new Strategy(strat));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Sækir notanda út frá id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    // getum núna notað user í viewum
    res.locals.user = req.user;
  }

  next();
});

export function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
}

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    // req.user kemur beint úr users.js
    return res.send(`
      <p>Innskráður notandi er ${req.user.username}</p>
      <p>Þú ert ${req.user.admin ? 'admin.' : 'ekki admin.'}</p>
      <p><a href="/logout">Útskráning</a></p>
      <p><a href="/admin">Skoða leyndarmál</a></p>
    `);
  }

  return res.send(`
    <p><a href="/login">Innskráning</a></p>
  `);
});

app.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  let message = '';

  // Athugum hvort einhver skilaboð séu til í session, ef svo er birtum þau
  // og hreinsum skilaboð
  if (req.session.messages && req.session.messages.length > 0) {
    message = req.session.messages.join(', ');
    req.session.messages = [];
  }

  // Ef við breytum name á öðrum hvorum reitnum að neðan mun ekkert virka
  // nema við höfum stillt í samræmi, sjá línu 64
  return res.send(`
    <form method="post" action="/login" autocomplete="off">
      <label>Notendanafn: <input type="text" name="username"></label>
      <label>Lykilorð: <input type="password" name="password"></label>
      <button>Innskrá</button>
    </form>
    <p>${message}</p>
  `);
});

app.post(
  '/login',

  // Þetta notar strat að ofan til að skrá notanda inn
  passport.authenticate('local', {
    failureMessage: 'Notandanafn eða lykilorð vitlaust.',
    failureRedirect: '/login',
  }),

  // Ef við komumst hingað var notandi skráður inn, senda á /admin
  (req, res) => {
    res.redirect('/admin');
  },
);

app.get('/logout', (req, res) => {
  // logout hendir session cookie og session
  req.logout();
  res.redirect('/');
});

// ensureLoggedIn middleware passar upp á að aðeins innskráðir notendur geti
// skoðað efnið, aðrir lenda í redirect á /login, stillt í línu 103
app.get('/admin', ensureLoggedIn, (req, res) => {
  res.send(`
    <p>Hér eru leyndarmál</p>
    <p><a href="/">Forsíða</a></p>
  `);
});

//*******************************************************************/
//                                                                   /
//*******************************************************************/

/*
/   Main server.
app.get('/' , (req, res) => {
  res.send('Hello server-mavar');
});
*/

/*
/   Route - server.
*/
//app.use('/admin', adminRoute ); 
app.use('/tulkur', tulkurRoute );
app.use('/project', projectRoute); 

function notFoundHandler(req, res, next) {
  const title = 'Sida fannst ekki';
  res.status(404).json({ error: title });
}

function errorHandler(err, req, res, next) {
  console.error(err);
  const title = 'Villa kom upp';
  res.status(500).json( { error : title });
}

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}/`);
});
