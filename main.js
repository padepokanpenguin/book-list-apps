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

function makeBookObject(books) {
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

function addBookObject() {
  const bookTitle = document.querySelector("#inputBookTitle").value;
  const bookAuthor = document.querySelector("#inputBookAuthor").value;
  const bookYear = document.querySelector("#inputBookYear").value;
  const isComplete = document.querySelector("#inputBookIsComplete").checked;

  const generateId = generateID();
  const bookObject = generateBookObject(
    generateId,
    bookTitle,
    bookAuthor,
    bookYear,
    isComplete
  );
  books.push(bookObject);
  document.dispatchEvent(new Event(RENDER_BOOK));
}

// delete function
function deleteBook(event) {
  const idTarget = event.target.id;
  const indexTarget = books.findIndex(function (book) {
    book.id === idTarget;
  });

  console.log("index" + indexTarget, "id" + idTarget);
  document.dispatchEvent(new Event(RENDER_BOOK));
}

document.addEventListener("DOMContentLoaded", function () {
  const inputBookForm = document.getElementById("inputBook");

  inputBookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addBookObject();
  });
});

document.addEventListener(RENDER_BOOK, function () {
  makeBookObject(books);

  console.log(books);
  for (const book of books) {
    console.log(book);
  }
});
