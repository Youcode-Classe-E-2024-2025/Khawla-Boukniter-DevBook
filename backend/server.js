require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'assets')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

const usersRoute = require('./routes/users');
const booksRoute = require('./routes/books');
const categoriesRoute = require('./routes/categories');
const empruntsRoute = require('./routes/emprunts');

app.use('/auth', usersRoute);
app.use('/books', booksRoute);
app.use('/categories', categoriesRoute);
app.use('/emprunts', empruntsRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`node server is running on port ${port}`);

})