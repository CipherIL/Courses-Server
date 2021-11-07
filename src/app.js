const express = require('express');
const courseRouters = require('./routers/courseRouters');
const professorRouters = require('./routers/professorRouters');
const studentRouters = require('./routers/studentRouters');

const app = express();

app.use(express.json());
app.use(courseRouters);
app.use(professorRouters);
app.use(studentRouters);

module.exports = app;