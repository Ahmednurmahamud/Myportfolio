const express = require('express');
const db = require('./db/initDB'); // This line both initializes the database and imports the db connection.
const applyMiddleware = require('./middleware');
const applyRoutes = require('./routes');

const bcrypt = require("bcrypt")

const app = express();

// Apply middleware
applyMiddleware(app);

// Apply routes
applyRoutes(app);

const port = 8080;
app.listen(port, () => {
    console.log(`Server running and listening on port ${port}...`);
});