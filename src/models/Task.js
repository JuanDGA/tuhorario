const {Schema, model} = require('mongoose');

const taskSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  finalDate: {
    type: String,
    required: true,
  },
  finalHour: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  }
});

module.exports = model('Task', taskSchema);
