const express = require('express');
const cookieParser = require('cookie-parser');

const courseRouters = require('./routers/courseRouters');
const professorRouters = require('./routers/professorRouters');
const studentRouters = require('./routers/studentRouters');
const generalRouters = require('./routers/generalRouters');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(courseRouters);
app.use(professorRouters);
app.use(studentRouters);
app.use(generalRouters);

module.exports = app;