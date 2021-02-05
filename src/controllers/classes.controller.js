const clCtrl = {};
const Class = require('../models/Class');

clCtrl.renderClassForm = (req, res) => {
  res.render('Classes/newClass');
};

clCtrl.createClass = async (req, res) => {
  const { title, teacher, days, hourStart, hourEnd, link } = req.body;
  const newClass = new Class({
    title,
    teacher,
    days,
    hourStart,
    hourEnd,
    link,
  });
  newClass.user = req.user.id;
  await newClass.save();
  req.flash('successMsgClasses', 'Una nueva clase fue añadida');
  res.redirect('/Clases');
};

clCtrl.renderClasses = async (req, res) => {
  const classes = await Class.find({user: req.user.id}).lean();
  res.render('Classes/allClasses', {classes});
};

clCtrl.editClassForm = async (req, res) => {
  const classToUpdate = await Class.findById(req.params.id).lean();
  if (classToUpdate.user!==req.user.id) {
    return res.redirect('/Clases');
  }
  res.render('Classes/editClass',{classToUpdate});
};

clCtrl.updateClass = async (req, res) => {
  const {title, teacher, days, hourStart, hourEnd, link} = req.body;
  await Class.findByIdAndUpdate(req.params.id, {title, teacher, days, hourStart, hourEnd, link});
  req.flash('successMsgClasses', 'Una clase fue actualizada');
  res.redirect('/Clases');
};

clCtrl.deleteClass = async (req, res) => {
  await Class.findByIdAndDelete(req.params.id);
  req.flash('deletedMsgClasses', 'Una clase fue eliminada');
  res.redirect('/Clases');
};

module.exports = clCtrl;