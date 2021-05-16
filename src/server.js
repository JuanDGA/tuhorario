const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();
require('./config/passport');

app.set('port', process.env.TUHORARIO_PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', hbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs')

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'appcreatedbyjg',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next)=>{
  res.locals.successMsgClasses = req.flash('successMsgClasses');
  res.locals.deletedMsgClasses = req.flash('deletedMsgClasses');
  res.locals.successMsgTasks = req.flash('successMsgTasks');
  res.locals.deletedMsgTasks = req.flash('deletedMsgTasks');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use(require('./routes/index.routes'));
app.use(require('./routes/classes.routes'));
app.use(require('./routes/tasks.routes'));
app.use(require('./routes/users.routes'));

app.use(express.static(path.join(__dirname,'public')));

module.exports = app;