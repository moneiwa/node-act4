const express = require('express');
const app = express();
app.use(express.json());

let books = [];

app.get('/books', (req, res) => {
    res.json(books);
});

app.post('/books', (req, res) => {
    const { title, author, publisher, publishedDate, isbn } = req.body;

    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        title, author, publisher, publishedDate, isbn
    };

    books.push(newBook);
    res.status(201).json(newBook);
});


app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(book => book.id === id);

    if (index !== -1) {
        const { title, author, publisher, publishedDate, isbn } = req.body;

        books[index] = { id, title, author, publisher, publishedDate, isbn };
        res.json(books[index]);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = books.length;
    books = books.filter(book => book.id !== id);

    if (books.length < initialLength) {
        res.status(204).send({message:"delete successful"});  //no c


    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

app.listen(3000, () => {
    console.log('Server listening at port 3000');
});
