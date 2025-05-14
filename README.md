# React + Vite
=> Personal Library Manager – Documentation
=> Overview
The Personal Library Manager is a single-page CRUD (Create, Read, Update, Delete) application built with React. It allows users to manage their personal collection of books. The application stores book data in the browser's localStorage to ensure data persistence between sessions.

=> Technologies Used
React: Front-end JavaScript library.

Bootstrap (optional): For responsive UI.

LocalStorage: To persist data without a backend.

=> Components & Functionality
1. useState and useEffect
useState: Manages book form (book), book list (books), and editing state (editId).

useEffect: On initial load, fetches books from localStorage.

2. Form Handling
Form fields:

Title (text input)

Author (text input)

Genre (dropdown)

Status (radio buttons)

Uses handleChange() to dynamically update book state.

handleSubmit() manages both add and update functionality.

3. Add Book
When editId === -1, a new book is added.

Stored in both state and localStorage.

4. Edit Book
Sets the selected book in the form using handleEdit().

Updates editId and changes button text to "Update Book".

5. Update Book
Replaces the matching book by id using .map().

Updates both the state and localStorage.

6. Delete Book
Removes book by ID using .filter().

Updates both the state and localStorage.


