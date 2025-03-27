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
    const { message, user } = req.body; // Extract user and message from the form
    messages.push({ text: message, user: user, added: new Date() }); // Add the new message to the array
    res.redirect('/'); // Redirect back to the homepage
});

// Define the message details route
app.get('/message/:id', (req, res) => {
    const messageId = parseInt(req.params.id, 10); // Get the message ID from the URL
    const message = messages[messageId]; // Find the message by its index
    if (message) {
        res.render('message', { title: 'Message Details', message: message });
    } else {
        res.status(404).send('Message not found');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});