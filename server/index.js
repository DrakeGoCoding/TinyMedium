const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 8080;
const express = require('express');
const app = express();
const cors = require('cors');

const connection = require('./db');
const db = async () => await connection();
db();

const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const profileRoute = require('./routes/profileRoute');
const articleRoute = require('./routes/articleRoute');
const tagRoute = require('./routes/tagRoute');
const errorMiddleware = require('./middlewares/errorMiddleware');

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/users', authRoute, errorMiddleware.handleError);
app.use('/user', userRoute, errorMiddleware.handleError);
app.use('/profiles', profileRoute, errorMiddleware.handleError);
app.use('/articles', articleRoute, errorMiddleware.handleError);
app.use('/tags', tagRoute, errorMiddleware.handleError);

app.listen(port, () => { console.log('Listening to PORT:' + port) });

module.exports = app;
