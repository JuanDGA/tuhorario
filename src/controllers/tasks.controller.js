const tkCtrl = {};
const Task = require('../models/Task');

tkCtrl.renderTaskForm = (req, res) => {
  res.render('Tasks/newTask');
};

tkCtrl.createTask = async (req, res) => {
  const {subject, finalDate, finalHour, description} = req.body;
  const newTask = new Task({
    subject, finalDate, finalHour, description,
  });
  newTask.user = req.user.id;
  await newTask.save();
  req.flash('successMsgTasks', 'Una nueva tarea fue añadida');
  res.redirect('/Tareas');
};

tkCtrl.renderTasks = async (req, res) => {
  const tasks = await Task.find({user: req.user.id}).sort({createdAt: 'desc'}).lean();
  res.render('Tasks/allTasks', {tasks});
};

tkCtrl.editTaskForm = async (req, res) => {
  const taskToUpdate = await Task.findById(req.params.id).lean();
  if (taskToUpdate.user != req.user.id) {
    return res.redirect('/Tareas');
  }
  res.render('Tasks/editTask',{taskToUpdate});
};

tkCtrl.updateTask = async (req, res) => {
  const {subject, finalDate, finalHour, description} = req.body;
  await Task.findByIdAndUpdate(req.params.id, {subject, finalDate, finalHour, description});
  req.flash('successMsgTasks', 'Una tarea fue actualizada');
  res.redirect('/Tareas');
};

tkCtrl.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  req.flash('deletedMsgTasks', 'Una tarea fue eliminada');
  res.redirect('/Tareas');
};

module.exports = tkCtrl;