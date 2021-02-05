const {Router} = require('express');

const router = Router();

const {renderClassForm, createClass, renderClasses, editClassForm, updateClass, deleteClass} = require('../controllers/classes.controller');

const {isAuthenticated} = require('../helpers/validate');

router.get('/Clases/Nueva', isAuthenticated, renderClassForm);

router.post('/Clases/Nueva', isAuthenticated, createClass);

router.get('/Clases', isAuthenticated, renderClasses);

router.get('/Clases/Editar/:id', isAuthenticated, editClassForm);

router.put('/Clases/Editar/:id', isAuthenticated, updateClass);

router.delete('/Clases/Borrar/:id', isAuthenticated, deleteClass);

module.exports = router;