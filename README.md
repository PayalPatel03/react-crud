# React + Vite

=> Overview
The Movie Manager is a single-page React application that allows users to add, view, edit, and delete movie records. It uses Bootstrap for styling and provides a modal-based UI for adding/editing movies.

=> Features
Add new movies with Title, Director, and Year

Edit existing movie entries via modal

Delete movies from the list

Auto-focus on the title field when the modal opens

Maintains a unique ID for each movie using Date.now()

State Management
js
Copy
Edit
const [movie, setMovie] = useState({});
const [movies, setMovies] = useState([]);
const [editIdx, setEditIdx] = useState(-1);
const [showModal, setShowModal] = useState(false);
Explanation:
movie: Current movie object (used for form inputs).

movies: List of all added movies.

editIdx: ID of the movie being edited (-1 means add mode).

showModal: Controls modal visibility.

=> Event Handlers
handleChange(e)
Updates movie object as user types into form fields.

handleSubmit(e)
Prevents default form submission

If in add mode, appends movie to the list

If in edit mode, updates the selected movie

Resets the form and closes the modal

handleDelete(id)
Removes a movie from the list by filtering it out.

handleEdit(id)
Finds the movie by ID

Populates the modal with selected movie details

Opens modal in edit mode

=> Modal Handling
The modal is conditionally rendered with showModal && (...)

Uses Bootstrap classes for a visually appealing UI

Includes close and submit buttons

Auto-focus is applied to the "Title" field using useEffect and focusRef

=> Controlled Components
All form inputs are controlled using state:

js
Copy
Edit
value={movie.title || ""}
onChange={handleChange}
This ensures input values are always synced with the component state.

=> UI Components
Button: To add new movies

Table: To display list of movies

Modal: For both adding and editing movie entries

=> Improvements to Consider
Form validation before submission

LocalStorage integration to persist data

Sorting/filtering movies

Pagination for large lists
