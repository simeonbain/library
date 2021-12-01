/* Global variables */ 
const library = []; 

/* Classes */ 
function Book(title, author, numPages, type, status) {
  this.title = title;
  this.author = author;
  this.numPages = numPages; 
  this.type = type; 
  this.status = status; 
}

/* Adds the given book to the library */
function addBookToLibrary(book) {
  library.push(book); 
}

/* Removes the given book from the library */
function removeBookFromLibrary(book) {
  library.pop(book); 
}

/* Updates the DOM to present the new book form to the user */ 
function openNewBookForm() {
  newBookFormDisplay.classList.remove(`hidden`);
  newBookButton.classList.add(`hidden`);
  main.classList.add(`hidden`);
}

/* Updates the DOM to hide the new book form from the user */ 
function closeNewBookForm() {
  newBookFormDisplay.classList.add(`hidden`);
  newBookButton.classList.remove(`hidden`);
  main.classList.remove(`hidden`);
}

/* Parses the new book form input from the user and adds a new book */ 
function processNewBookForm() {
  newBookForm.reset(); 
  closeNewBookForm(); 
}

/* Query Seletors */
const newBookButton = document.querySelector(`.btn-new-book`); 
const newBookCancelButton = document.querySelector(`.btn-new-book-cancel`)
const newBookSubmitButton = document.querySelector(`.btn-new-book-submit`)
const newBookFormDisplay = document.querySelector(`.container-new-book-form`);
const newBookForm = document.querySelector(`.new-book-form`);
const main = document.querySelector(`.container-main`); 

/* Event Listeners */ 
newBookButton.addEventListener(`click`, openNewBookForm);
newBookCancelButton.addEventListener(`click`, closeNewBookForm);
newBookSubmitButton.addEventListener(`click`, processNewBookForm);