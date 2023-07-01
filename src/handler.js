const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
 
    const id = nanoid(16);
    const finished = (pageCount === readPage) ? true: false;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    
    const newBook = {
        name, year, author, summary, publisher, pageCount, readPage, reading, id, finished, createdAt, updatedAt,
    };
    
    books.push(newBook);
    
    const isSuccess = books.filter((note) => books.id === id).length > 0;
};
 
module.exports = { addBookHandler };