import React, { useState, useRef, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const MovieApp = () => {
  const [movie, setMovie] = useState({});
  const [movies, setMovies] = useState([]);
  const [editIdx, setEditIdx] = useState(-1);
  const [showModal, setShowModal] = useState(false);

  const modalRef = useRef();
  const focusRef = useRef();

 useEffect(() => {
  if (showModal && focusRef.current) {
    focusRef.current.focus();
  }
}, [showModal]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Date.now();
    if (editIdx === -1) {
      setMovies([...movies, { ...movie, id }]);
    } else {
      const updated = movies.map((m) => (m.id === editIdx ? { ...movie, id: editIdx } : m));
      setMovies(updated);
      setEditIdx(-1);
    }
    setMovie({});
    setShowModal(false);
  };

  const handleDelete = (id) => {
    const updated = movies.filter((movie) => movie.id !== id);
    setMovies(updated);
  };

  const handleEdit = (id) => {
    const found = movies.find((movie) => movie.id === id);
    setMovie(found);
    setEditIdx(id);
    setShowModal(true);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center fw-bold"> Movie Manager</h2>
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Add Movie
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => (
            <tr key={movie.id}>
              <td>{index + 1}</td>
              <td>{movie.title}</td>
              <td>{movie.director}</td>
              <td>{movie.year}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(movie.id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(movie.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" ref={modalRef}>
          <div className="modal-dialog">
            <form onSubmit={handleSubmit}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Movie</h5>
                  <button type="button" className="btn-close" onClick={() => { setShowModal(false); setEditIdx(-1); setMovie({}) }}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label>Title</label>
                    <input type="text" className="form-control"  ref={focusRef} name="title" value={movie.title || ""} onChange={handleChange}  />
                  </div>
                  <div className="mb-3">
                    <label>Director</label>
                    <input type="text" className="form-control" name="director" value={movie.director || ""} onChange={handleChange}  />
                  </div>
                  <div className="mb-3">
                    <label>Year</label>
                    <input type="number" className="form-control" name="year" value={movie.year || ""} onChange={handleChange}  />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => { setShowModal(false); setEditIdx(-1); setMovie({}) }}>Close</button>
                  <button type="submit" className="btn btn-primary">{editIdx !== -1 ? "Update" : "Add"}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieApp;
