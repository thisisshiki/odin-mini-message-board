const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Sample messages array
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Define the index route
app.get('/', (req, res) => {
    res.render('index', { title: 'Home', messages: messages });
});

// Define the new message form route
app.get('/new', (req, res) => {
    res.render('new', { title: 'New Message' });
});

// Handle form submission
app.post('/new', (req, res) => {
    const { message, user } = req.body;
    messages.push({ text: message, user: user, added: new Date() });
    res.redirect('/');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});