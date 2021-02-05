const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
}).then(e => console.log('Connected'))
  .catch(err => console.log(err));