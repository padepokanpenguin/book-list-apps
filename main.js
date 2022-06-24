const books = [];
const RENDER_BOOK = "bookChanged";

function generateID() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

function addBookObject() {
  const bookTitle = document.getElementById("inputBookTitle").value;
  const bookAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;
  const isComplete = document.getElementById("inputBookIsComplete").checked;

  const generateId = generateID();
  const bookListItem = generateBookObject(
    generateId,
    bookTitle,
    bookAuthor,
    bookYear,
    isComplete
  );
  console.log("Book List Item: " + bookListItem);
  books.push(bookListItem);
  document.dispatchEvent(new Event(RENDER_BOOK));
}

function deleteBook(event) {
  const idTarget = event.target.id;
  const indexTarget = books.findIndex((book) => book.id === idTarget);
  // console.log(idTarget, indexTarget);
  // books.filter((book) => book.id !== idTarget);
  if (indexTarget) {
    books.splice(indexTarget, 1);
  }
  document.dispatchEvent(new Event(RENDER_BOOK));
}

function makeBookObject() {
  const inCompleteBook = document.getElementById("incompleteBookshelfList");
  const completedBook = document.getElementById("completeBookshelfList");

  (inCompleteBook.innerHTML = ""), (completedBook.innerHTML = "");

  for (const book of books) {
    const bookItemContainer = document.createElement("article");
    bookItemContainer.classList.add("book_item");
    const title = document.createElement("h3");
    title.innerText = book.title;

    const author = document.createElement("p");
    author.innerText = "Penulis: " + book.author;

    const year = document.createElement("p");
    year.innerText = "Tahun: " + book.year;

    if ((bookItemContainer.append(title, author, year), book.isComplete)) {
      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("action");

      const belumSelesaibtn = document.createElement("button");
      belumSelesaibtn.id = book.id;
      belumSelesaibtn.innerText = "Belum Selesai dibaca";
      belumSelesaibtn.classList.add("green");

      const trashButton = document.createElement("button");
      trashButton.id = book.id;
      trashButton.classList.add("red");
      trashButton.innerText = "Hapus buku";
      trashButton.addEventListener("click", function (event) {
        deleteBook(event);
      });

      buttonContainer.append(belumSelesaibtn, trashButton);
      bookItemContainer.append(buttonContainer);
      completedBook.append(bookItemContainer);
    } else {
      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("action");

      const selesaiBtn = document.createElement("button");
      selesaiBtn.id = book.id;
      selesaiBtn.innerText = "Selesai dibaca";
      selesaiBtn.classList.add("green");

      const trashButton = document.createElement("button");
      trashButton.id = book.id;
      trashButton.classList.add("red");
      trashButton.innerText = "Hapus buku";
      trashButton.addEventListener("click", function (event) {
        deleteBook(event);
      });

      buttonContainer.append(selesaiBtn, trashButton);
      bookItemContainer.append(buttonContainer);
      inCompleteBook.append(bookItemContainer);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const inputBookForm = document.getElementById("inputBook");

  inputBookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addBookObject();
    console.log("Books: " + books);
  });
});

document.addEventListener(RENDER_BOOK, function () {
  for (const book of books) {
    makeBookObject(book);
  }
});
