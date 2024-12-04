const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const path=require('path');
const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.use('/api', authRoutes);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));          //CORS remaining
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));          //CORS remaining
});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));          //CORS remaining
});
// Async function to sync the database and start the server
const startServer = async () => {
    try {
        // Sync database
        await sequelize.sync();
        console.log('Database connected and synced.');

        // Start server
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

// Start the server
startServer();
