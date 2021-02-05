const {Router} = require('express');

const router = Router();

const {renderTaskForm, createTask, renderTasks, editTaskForm, updateTask, deleteTask} = require('../controllers/tasks.controller');

const {isAuthenticated} = require('../helpers/validate');

router.get('/Tareas/Nueva', isAuthenticated, renderTaskForm);

router.post('/Tareas/Nueva', isAuthenticated, createTask);

router.get('/Tareas', isAuthenticated, renderTasks);

router.get('/Tareas/Editar/:id', isAuthenticated, editTaskForm);

router.put('/Tareas/Editar/:id', isAuthenticated, updateTask);

router.delete('/Tareas/Borrar/:id', isAuthenticated, deleteTask);

module.exports = router;