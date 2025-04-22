const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('hello');
});

const usersRoute = require('./routes/users');
const booksRoute = require('./routes/books');
const categoriesRoute = require('./routes/categories');
const empruntsRoute = require('./routes/emprunts');

app.use('/users', usersRoute);
app.use('/books', booksRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`node server is running on port ${port}`);

})