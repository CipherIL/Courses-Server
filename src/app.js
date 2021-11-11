const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');

const courseRouters = require('./routers/course.router');
const professorRouters = require('./routers/professor.router');
const studentRouters = require('./routers/student.router');
const generalRouters = require('./routers/general.router');

const app = express();

app.use(cors({
    origin:["http://localhost:3000",],
    credentials:true,
    exposedHeaders:["set-cookie"],
}));
app.use(express.json());
app.use(cookieParser());
app.use(courseRouters);
app.use(professorRouters);
app.use(studentRouters);
app.use(generalRouters);

module.exports = app;