import React, { useEffect, useRef, useState } from "react";

const Form = () => {
  const [book, setBook] = useState({});
  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState(-1);
  const editRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    const newBook = JSON.parse(localStorage.getItem("library")) || [];
    setBooks(newBook);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Date.now();

    if (editId === -1) {
      const newBooks = [...books, { ...book, id }];
      setBooks(newBooks);
      localStorage.setItem("library", JSON.stringify(newBooks));
    } else {
      const update = books.map((e) =>
        e.id === editId ? { ...book, id: editId } : e
      );
      setBooks(update);
      localStorage.setItem("library", JSON.stringify(update));
      setEditId(-1);
      editRef.current.innerText = "Add Book";
    }

    setBook({});
  };

  const handleDelete = (id) => {
    const delBook = books.filter((b) => b.id !== id);
    setBooks(delBook);
    localStorage.setItem("library", JSON.stringify(delBook));
  };

  const handleEdit = (id) => {
    const selected = books.filter((b) => b.id === id);
    setBook(selected);
    setEditId(id);
    editRef.current.innerText = "Update Book";
    focusRef.current.focus();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center"> Personal Library Manager</h2>
        <div className="row">
            <div className="col-md-6 mx-auto">
                 <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={book.title || ""}
            onChange={handleChange}
            ref={focusRef}
            
          />
        </div>
        <div className="mb-3">
          <label>Author</label>
          <input
            type="text"
            className="form-control"
            name="author"
            value={book.author || ""}
            onChange={handleChange}
           
          />
        </div>
        <div className="mb-3">
          <label>Category</label>
          <select
            className="form-control"
            name="genre"
            value={book.genre || ""}
            onChange={handleChange}
           
          >
            <option value="">Select Category</option>
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Sci-Fi</option>
            <option>Biography</option>
            <option>Programming</option>
          </select>
        </div>
       
        <button ref={editRef} type="submit" className="btn btn-success">
          Add Book
        </button>
      </form>
            </div>
        </div>

      <table className="table table-bordered caption-top">
        <caption className="fs-2  fw-bold text-center">Data Record</caption>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b, idx) => (
            <tr key={b.id}>
              <td>{idx + 1}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.genre}</td>
              
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(b.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(b.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  );
};

export default Form;
