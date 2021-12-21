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
}

/* Creates and returns the HTML element that displays a book */
function createBookElement(book) {
  const deleteButton = document.createElement(`button`);
  deleteButton.classList.add(`delete`);
  deleteButton.innerText = `x`;

  const author = document.createElement(`h3`);
  author.innerText = book.author;

  const readButton = document.createElement(`div`);
  readButton.classList.add(`status`);
  readButton.appendChild(document.createElement(`p`));
  readButton.lastElementChild.innerText = `Read`;
  readButton.appendChild(document.createElement(`button`));
  readButton.lastElementChild.innerHTML = `&check;`;
  if (book.status === `read`) {
    readButton.lastElementChild.classList.add(`read`);
  }

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
  bookCardBottom.lastElementChild.lastElementChild.appendChild(readButton);
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

/* Adds the given book to the library */
function addBookToLibrary(book) {
  booksContainer.appendChild(createBookElement(book));
}

/* Removes the given book from the library */
function removeBookFromLibrary(book) {}

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
const newBookCancelButton = document.querySelector(`.btn-new-book-cancel`);
const newBookSubmitButton = document.querySelector(`.btn-new-book-submit`);
const newBookFormDisplay = document.querySelector(`.container-new-book-form`);
const newBookForm = document.querySelector(`.new-book-form`);
const main = document.querySelector(`.container-main`);
const booksContainer = document.querySelector(`.books-container`);

/* Event Listeners */
window.addEventListener(`load`, onLoad);
newBookButton.addEventListener(`click`, openNewBookForm);
newBookCancelButton.addEventListener(`click`, closeNewBookForm);
newBookSubmitButton.addEventListener(`click`, processNewBookForm);

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
