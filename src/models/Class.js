const {Schema, model} = require('mongoose');

const classSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  days: {
    type: String,
    required: true,
  },
  hourStart: {
    type: String,
    required: true,
  },
  hourEnd: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  user: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = model('Class', classSchema);
