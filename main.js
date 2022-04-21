/* Variables Kinds
String
Number
Array => Object (based on Java Script)
Object
Bollean
*/

let validateText = document.querySelector('.validate');
let parent = document.querySelector('.parent');
let title = document.querySelector('#book-title');
let author = document.querySelector('#author-title');
let isbn = document.querySelector('#isbn-title');
let main = document.querySelector('.local-storage');
let bookSubmit = document.querySelector('.submit');
let clear = document.querySelector('.local-submit');
let mode = document.querySelector('.mode');
let modeBall = document.querySelector('.mode span');
let mainColor = document.styleSheets;
let bookForm = document.forms[0];
let books = [];
if (window.localStorage.getItem('books')) {
       books = JSON.parse(window.localStorage.getItem('books'));
}

if (window.localStorage.getItem('mode')) {
       document.body.classList.add('dark');
}

mode.addEventListener('click', function () {
       document.body.classList.toggle('dark');
       if (document.body.classList.contains('dark')) {
              window.localStorage.setItem('mode', 'dark');
       } else {
              window.localStorage.removeItem('mode');
       }
});

main.addEventListener('click', (e) => {
       if (e.target.className === 'del') {
              deleteElementFromLocalStorage(e.target.parentElement.id);
              e.target.parentElement.remove();
              validateText.innerHTML = 'Book removed!';
              bookAdded();
       }
});

clear.addEventListener('click', function () {
       main.innerHTML = '';
       window.localStorage.removeItem('books');
});

bookForm.onsubmit = function (e) {
       e.preventDefault();
       if (title.value === '' || author.value === '' || isbn.value === '') {
              wrongValidate();
       } else {
              addElementToObject();
              title.value = '';
              author.value = '';
              isbn.value = '';
              validateText.innerHTML = 'Book added!';
              bookAdded();
       }
};

function wrongValidate() {
       validateText.innerHTML = 'please fill in all fields!';
       validateText.style.display = 'block';
       validateText.style.backgroundColor = 'red';
       setTimeout(() => (validateText.style.display = 'none'), 2000);
}

function bookAdded() {
       validateText.style.display = 'block';
       validateText.style.backgroundColor = 'green';
       setTimeout(() => (validateText.style.display = 'none'), 2000);
}

function addElementToObject() {
       const bookFile = {
              name: title.value,
              write: author.value,
              date: isbn.value,
              id: Date.now(),
       };
       books.push(bookFile);
       addBooksToPage(books);
       addElementsToLocalStorage(books);
}

function addBooksToPage(books) {
       main.innerHTML = '';
       books.forEach((ele) => {
              let pageParent = document.createElement('div');
              pageParent.setAttribute('id', ele.id);
              let bookTitle = document.createElement('span');
              bookTitle.appendChild(document.createTextNode(ele.name));
              pageParent.appendChild(bookTitle);

              let bookAuthor = document.createElement('span');
              bookAuthor.appendChild(document.createTextNode(ele.write));
              pageParent.appendChild(bookAuthor);

              let bookIsbn = document.createElement('span');
              bookIsbn.appendChild(document.createTextNode(ele.date));
              pageParent.appendChild(bookIsbn);

              let deleter = document.createElement('span');
              deleter.className = 'del';
              deleter.appendChild(document.createTextNode('X'));
              pageParent.appendChild(deleter);

              main.appendChild(pageParent);
       });
}

function addElementsToLocalStorage(books) {
       window.localStorage.setItem('books', JSON.stringify(books));
}

function addElementsToPageFromLocalStorage() {
       let data = localStorage.getItem('books');
       addBooksToPage(JSON.parse(data));
}

function deleteElementFromLocalStorage(ele) {
       books = books.filter((e) => e.id != ele);
       addElementsToLocalStorage(books);
}

addElementsToPageFromLocalStorage();
