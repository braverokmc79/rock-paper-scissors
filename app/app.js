const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

// xpress - session 설정
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const options = {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};
const sessionStore = new MySQLStore(options);
app.use(session({
    secret: "rockpaperscissors@#@!#$$$!@!!232312",
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}))


//라우터
const home = require("./src/routes/home");

// const morgan = require('morgan');
// const logger = require('./src/config/logger');
// app.use(morgan("tiny", { stream: logger.stream })); // morgan 로그 설정


//앱 셋팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.use("/", home); //use ->미들웨어를 등록해 주는 메소드.


module.exports = app;


