const express = require('express');
const app = express();
const db = require('./models');
require('dotenv').config();

const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const profileRoute = require('./routes/profileRoute');

app.use(express.urlencoded({extended: true})); //true for qs , false for query string
app.use(express.json());

app.use('/api/v1', userRoute);
app.use('/api/v1', productRoute);
app.use('/api/v1', profileRoute);

app.use((req, res, next) => {
    // Allowing requests from any origin (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Allowing specific HTTP methods for cross-origin requests
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // From backend to frontend

    // Allowing specific HTTP methods for cross-origin requests
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // From frontend to backend

    // Allowing specific headers in cross-origin requests
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Additional security headers (e.g., prevent MIME-type sniffing)
    res.setHeader('X-Content-Type-Options', 'nosniff');

    next();
});

const PORT = process.env.PORT || 5000;

db.sequelize
    .sync()
    .then(() => {
        console.log('Connected successfully to MySQL.👍');
        app.listen(PORT, () => {
            console.log('Server is running on port 5000... ➡️');
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MySQL:', err);
    });
