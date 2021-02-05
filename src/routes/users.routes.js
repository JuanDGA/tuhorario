const {Router} = require('express');
const router = Router();

const { renderRegisterForm, renderLoginForm, register, login, logout } = require('../controllers/users.controller');

router.get('/Register', renderRegisterForm);

router.get('/Login', renderLoginForm);

router.post('/Register', register);

router.post('/Login', login);

router.get('/Logout', logout);

module.exports = router;
