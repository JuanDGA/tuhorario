require('dotenv').config();
const app = require('./src/server');
require('./src/Database');

app.listen(app.get('port'), ()=>{
  console.log('Server running on port', app.get('port') );
});