const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User'); 

passport.use(new LocalStrategy({
  usernameField: 'user'
}, async (username, password, done) => {
  const user = await User.findOne({user: username});
  if (!user) {
    return done(null, false, { message: 'El usuario no existe' });
  } else {
    const match = await user.matchPassword(password);
    if(match) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Contraseña incorrecta' });
    }
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
