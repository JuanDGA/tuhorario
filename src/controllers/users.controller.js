const usersCtrl = {};
const User = require('../models/User');
const passport = require('passport');

usersCtrl.renderLoginForm = (req, res) => {
  res.render('Users/login');
};

usersCtrl.login = passport.authenticate('local', {
  failureRedirect: '/Login',
  successRedirect: '/Clases',
  failureFlash: true,
});

usersCtrl.renderRegisterForm = (req, res) => {
  res.render('Users/register');
};

usersCtrl.register = async (req, res) => {
  const errors = [];
  const { name, user, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    errors.push({ text: 'Las contraseñas no coinciden.' });
  } if (password.length < 8) {
    errors.push({ text: 'La contraseña debe tener al menos 8 caracteres.' })
  } if (await User.findOne({ user })) {
    errors.push({ text: 'El nombre de usuario ya esta en uso' });
  } if (errors.length > 0) {
    res.render('Users/register', {
      errors,
      name,
      user,
    })
  } else {
    const saveUser = new User({ name, user, password });
    saveUser.password = await saveUser.encryptPassword(password);
    await saveUser.save();
    req.flash('successMsgClasses', 'Registrado correctamente')
    res.redirect('/login');
  }
};

usersCtrl.logout = (req, res) => {
  req.logout();
  res.redirect('/')
};

module.exports = usersCtrl;
