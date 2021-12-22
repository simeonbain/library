/* Global Variables */
let library = [];
let activeFilter = `all`;

/* Classes */
function Book(title, author, numPages, type, status) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.type = type;
  this.status = status;
}

/* Actions to perform on load or refresh */
function onLoad() {
  addSampleBooks();
  document.getElementById(`filter-all`).checked = true;
  updateLibraryDisplay();
}

/* Adds the given book to the library */
function addBookToLibrary(book) {
  library.push(book);
}

/* Removes the given book from the library */
function removeBookFromLibrary(bookToDelete) {
  library = library.filter((book) => book !== bookToDelete);
}

/* Updates the DOM to populate the books container with the library contents */
function updateLibraryDisplay() {
  // Remove existing DOM elements
  while (booksContainer.lastElementChild) {
    booksContainer.removeChild(booksContainer.lastElementChild);
  }

  // Create a DOM element for each book in the library and display it
  library.forEach((book) => {
    if (activeFilter === `all`) {
      booksContainer.appendChild(createBookElement(book));
    } else if (activeFilter === book.status) {
      booksContainer.appendChild(createBookElement(book));
    } else {
      // book should be filtered out, so don't display it
    }
  });
}

/* Creates and returns the HTML element that displays a book */
function createBookElement(book) {
  const deleteButton = document.createElement(`button`);
  deleteButton.classList.add(`delete`);
  deleteButton.innerText = `x`;
  // Event listener for delete button
  deleteButton.addEventListener(`click`, () => deleteBook(book));

  const author = document.createElement(`h3`);
  author.innerText = book.author;

  const statusButton = document.createElement(`div`);
  statusButton.classList.add(`status`);
  statusButton.appendChild(document.createElement(`p`));
  statusButton.lastElementChild.innerText = `Read`;
  statusButton.appendChild(document.createElement(`button`));
  statusButton.lastElementChild.innerHTML = `&check;`;
  if (book.status === `read`) {
    statusButton.lastElementChild.classList.add(`read`);
  } else {
    statusButton.lastElementChild.classList.add(`unread`);
  }
  // Event listener for status button
  statusButton.addEventListener(`click`, () => updateBookStatus(book));

  const title = document.createElement(`h2`);
  title.innerText = book.title;

  const pages = document.createElement(`div`);
  pages.classList.add(`pages`);
  pages.appendChild(document.createElement(`p`));
  pages.lastElementChild.innerText = `Pages`;
  pages.appendChild(document.createElement(`h2`));
  pages.lastElementChild.innerText = book.numPages;

  const bookCardBottom = document.createElement(`div`);
  bookCardBottom.classList.add(`book-card-bottom`);
  bookCardBottom.appendChild(document.createElement(`div`));
  bookCardBottom.lastElementChild.classList.add(`book-card-content`);
  bookCardBottom.lastElementChild.appendChild(document.createElement(`div`));
  bookCardBottom.lastElementChild.lastElementChild.appendChild(author);
  bookCardBottom.lastElementChild.lastElementChild.appendChild(statusButton);
  bookCardBottom.lastElementChild.appendChild(document.createElement(`div`));
  bookCardBottom.lastElementChild.lastElementChild.appendChild(title);
  bookCardBottom.lastElementChild.lastElementChild.appendChild(pages);

  const bookElement = document.createElement(`div`);
  bookElement.classList.add(`book-card`);
  bookElement.classList.add(book.type);
  bookElement.appendChild(deleteButton);
  bookElement.appendChild(document.createElement(`div`));
  bookElement.appendChild(bookCardBottom);

  return bookElement;
}

/* Deletes a given book */
function deleteBook(book) {
  removeBookFromLibrary(book);
  updateLibraryDisplay();
}

/* Updates the status of a given book */
function updateBookStatus(book) {
  book.status === `unread` ? (book.status = `read`) : (book.status = `unread`);
  updateLibraryDisplay();
}

/* Updates the DOM to apply the selected filter */
function filterLibrary(evt) {
  activeFilter = evt.target.value;
  updateLibraryDisplay();
}

/* Updates the DOM to present the new book form to the user */
function openNewBookForm() {
  newBookFormDisplay.classList.remove(`hidden`);
  newBookButton.classList.add(`hidden`);
  main.classList.add(`hidden`);
}

/* Parses the new book form input from the user and adds a new book */
function processNewBookForm() {
  const title = newBookForm.elements[`new-book-title`].value;
  const author = newBookForm.elements[`new-book-author`].value;
  const numPages = newBookForm.elements[`new-book-numpages`].value;
  const type = newBookForm.elements[`new-book-type`].value;
  const status = newBookForm.elements[`new-book-status`].value;

  const book = new Book(
    title === `` ? `_` : title,
    author === `` ? `_` : author,
    numPages === `` || !Number.isInteger(+numPages) || +numPages < 0
      ? `_`
      : +numPages,
    type === `` ? `other` : type,
    status === `` ? `unread` : status
  );

  addBookToLibrary(book);
  closeNewBookForm();
}

/* Updates the DOM to hide the new book form from the user */
function closeNewBookForm() {
  newBookForm.reset();
  newBookFormDisplay.classList.add(`hidden`);
  newBookButton.classList.remove(`hidden`);
  updateLibraryDisplay();
  main.classList.remove(`hidden`);
}

/* Query Selectors */
const main = document.querySelector(`.container-main`);
const booksContainer = document.querySelector(`.books-container`);
const filterSelector = document.querySelectorAll(`.filter input`);
const newBookButton = document.querySelector(`.btn-new-book`);
const newBookCancelButton = document.querySelector(`.btn-new-book-cancel`);
const newBookCreateButton = document.querySelector(`.btn-new-book-create`);
const newBookFormDisplay = document.querySelector(`.container-new-book-form`);
const newBookForm = document.querySelector(`.new-book-form`);

/* Event Listeners */
window.addEventListener(`load`, onLoad);
filterSelector.forEach((filter) =>
  filter.addEventListener(`click`, filterLibrary)
);
newBookButton.addEventListener(`click`, openNewBookForm);
newBookCancelButton.addEventListener(`click`, closeNewBookForm);
newBookCreateButton.addEventListener(`click`, processNewBookForm);

/* Add some sample books for demo purposes */
function addSampleBooks() {
  const sampleBooks = [];

  sampleBooks.push(
    new Book(
      `The Fellowship of the Ring`,
      `J.R.R. Tolkien`,
      423,
      `fiction`,
      `unread`
    )
  );
  sampleBooks.push(
    new Book(
      `The Penguin Book of Puzzles`,
      `Dr. Gareth Moore`,
      531,
      `other`,
      `read`
    )
  );
  sampleBooks.push(
    new Book(`Into Thin Air`, `Jon Krakauer`, 416, `nonfiction`, `unread`)
  );
  sampleBooks.push(
    new Book(
      `JavaScript: The Good Parts`,
      `Douglas Crockford`,
      180,
      `textbook`,
      `unread`
    )
  );

  sampleBooks.forEach((book) => {
    addBookToLibrary(book);
  });
}
