const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
	const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

	if (!name) {
		const response = h.response({
			status: 'fail',
			message: 'Gagal menambahkan buku. Mohon isi nama buku',
		});
		response.code(400);
		return response;
	}

	if(readPage > pageCount) {
		const response = h.response({
			status: 'fail',
			message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
		});
		response.code(400);
		return response;
	}

	const id = nanoid(16);
	const finished = (pageCount === readPage) ? true: false;
	const createdAt = new Date().toISOString();
	const updatedAt = createdAt;
	
	const newBook = {
		name, year, author, summary, publisher, pageCount, readPage, reading, id, finished, createdAt, updatedAt,
	};
	
	books.push(newBook);
	
	const isSuccess = books.filter((book) => book.id === id).length > 0;

	if (isSuccess) {
		const response = h.response({
			status: 'success',
			message: 'Buku berhasil ditambahkan',
			data: {
				bookId: id,
			}
		});
		response.header('Access-Control-Allow-Origin', '*');
		response.code(201);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Buku gagal di add',
	});
	response.code(500);
	return response;
};

const getAllBooksHandler = () => {
  if (books.length === 0) {
    return h.response({
      status: 'success',
      data: {
        books: [],
      },
    }).code(200);
  }

  const formattedBooks = books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  const response = {
    status: 'success',
    data: {
      books: formattedBooks,
    },
  };

  return h.response(response).code(200);
};

const getBookByIdHandler = (request, h) => {
	const { id } = request.params;

	const book = books.filter((n) => n.id === id)[0];

	if (book != undefined) {
		return {
			status: 'success',
			code: '200',
			data: {
				book
			},
		};
	}

	const response = h.response({
		status: 'fail',
		message: 'Buku tidak ditemukan',
	});
	response.code(404);
	return response;

};

const editBookByIdHandler = (request, h) => {
	const { id } = request.params;

	const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
	const updatedAt = new Date().toISOString();

	const index = notes.findIndex((note) => note.id === id);

	if (!name) {
		const response = h.response({
			status: 'fail',
			message: 'Gagal memperbarui buku. Mohon isi nama buku',
		});
		response.code(400);
		return response;
	}

	if(readPage > pageCount) {
		const response = h.response({
			status: 'fail',
			message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
		});
		response.code(400);
		return response;
	}

	if (index !== -1) {
		name, year, author, summary, publisher, pageCount, readPage, reading, id, finished, createdAt, updatedAt,

    notes[index] = {
			...notes[index],
			name,
			year,
			author,
			summary, 
			publisher, 
			pageCount,
			readPage, 
			reading,
			updatedAt,
		};

		const response = h.response({
			status: 'success',
			message: 'Buku berhasil diperbarui',
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Gagal, memperbarui. Id tidak ditemukan',
	});
	response.code(404);
	return response;

};

const deleteBookByIdHandler = (request, h) => {
	const { id } = request.params;

	const index = notes.findIndex((note) => note.id === id);

	if (index !== -1) {
		notes.splice(index, 1);
		const response = h.response({
			status: 'success',
			message: 'Buku berhasil dihapus',
		});
		response.code(200);
		return response;
	}

	const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler };