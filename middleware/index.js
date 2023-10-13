const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const connectSqlite3 = require('connect-sqlite3');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const { engine } = require('express-handlebars');

const SQLiteStore = connectSqlite3(session);

function applyMiddleware(app) {
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static('public'));
    app.use(session({
        saveUninitialized: false,
        resave: false,
        secret: "This123Is@Another#456GreatSecret678%Sentence"
    }));
    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.set('views', './views');
}

module.exports = applyMiddleware;