const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./components/routes');

app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://hritikhotagi:hritikhotagi@mw.ni3sso0.mongodb.net/?retryWrites=true&w=majority&appName=MW", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Use the routes defined in routes.js
app.use('/', routes);

// Start the server
app.listen(3001, () => {
    console.log("Server running on port 3001");
});
