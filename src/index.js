const app = require('./app');
require('./db/mongoose');

app.listen(process.env.PORT,()=>{
    console.log('App listening on port ' + process.env.PORT);
})