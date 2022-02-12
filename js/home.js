let elSearchForm = document.querySelector(".home_form");
let elSearchInput = document.querySelector(".search_input");
let elDarkModeBtn = document.querySelector(".dark_mode");
let elLogoutBtn = document.querySelector(".log_out");
let elNumberBooks = document.querySelector(".result_books_number");
let elOrderByBtn = document.querySelector(".order_by_btn");
let elBookmarkList = document.querySelector(".books_bookmark_list");
let elBooksList = document.querySelector(".books_list");
let elModal = document.querySelector(".modal");
let elModalBookName = document.querySelector(".modal_book_name");
let elModalCloseBtn = document.querySelector(".modal_close_btn");
let elModalImg = document.querySelector(".modal_book_img");
let elModalDesc = document.querySelector(".modal_desc");
let elModalItem = document.querySelector(".modal_item");
let elModalItemDesc = document.querySelectorAll(".modal_item_desc");
let elModalReadBtn = document.querySelector(".modal_read_btn");
let elOverly = document.querySelector(".overly");
let fetchedArray;
//................................................................
//  GET YEAR
const getYear = (time) => new Date(time).getFullYear();
//........................................................
//  RENDER BOOKS
const renderBooks = function (arr, place) {
  elBooksList.innerHTML = null;
  //.....
  fetchedArray = returnArr = () => arr;
  //.....
  arr.forEach((book) => {
    let card = `
    <li class="books_card_item">
    <div class="books_card_img_box">
      <img
        src="${book.volumeInfo.imageLinks.smallThumbnail}"
        alt=""
        width="201"
        height="202"
        class="books_card_img"
      />
    </div>
    <p class="books_card_name">${book.volumeInfo.title}</p>
    <p class="books_card_author">${book.volumeInfo.authors[0]}</p>
    <p class="books_card_year">${getYear(book.volumeInfo.publishedDate)}</p>
    <div class="books_card_bottom">
    <div class="books_card_btn_box">
      <button class="bookmark_btn" dataset=${book.id}>Bookmark</button>
      <button class="more_info_btn" data-abc=${book.id}>More Info </button>
    </div>
    <a href=${
      book.volumeInfo.previewLink
    } target="blank"        class="books_card_read_btn">Read</a>
    </div>
  </li>
    `;
    //............................

    //.................................
    place.insertAdjacentHTML("beforeend", card);
    //.................................
  });
};
//  FETCHING API
let getInfoBooks = async function (bookname) {
  let response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${bookname}`
  );
  let bookObj = await response.json();
  renderBooks(bookObj.items, elBooksList);
  console.log(bookObj);
};
getInfoBooks("python");

// MODAL CLOSING
elModalCloseBtn.addEventListener("click", function () {
  elModal.classList.add("visually-hidden");
  elOverly.classList.add("visually-hidden");
});
elOverly.addEventListener("click", function () {
  elModal.classList.add("visually-hidden");
  elOverly.classList.add("visually-hidden");
});
//......................
//  MODAL.....MODAL.....MODAL.....MODAL.....MODAL.....MODAL
elBooksList.addEventListener("click", function (evt) {
  if (evt.target.matches(".more_info_btn")) {
    fetchedArray().forEach((book) => {
      console.log(evt.target.dataset.abc);
      if (evt.target.dataset.abc == book.id) {
        elModal.classList.remove("visually-hidden");
        elOverly.classList.remove("visually-hidden");
        elModalBookName.textContent = book.volumeInfo.title;
        elModalImg.src = book.volumeInfo.imageLinks.smallThumbnail;
        elModalDesc.textContent = book.volumeInfo.description;
        book.volumeInfo.authors.forEach((autr) => {
          let autor = document.createElement("p");
          autor.classList.add("modal_item_desc");
          autor.textContent = autr;
          elModalItem.appendChild(autor);
        });

        elModalItemDesc[0].textContent = getYear(book.volumeInfo.publishedDate);
        elModalItemDesc[1].textContent = book.volumeInfo.publisher;
        elModalItemDesc[2].textContent = book.volumeInfo.categories[0];
        elModalItemDesc[3].textContent = book.volumeInfo.pageCount;
        elModalReadBtn.setAttribute("href", book.volumeInfo.previewLink);
      }
    });
  }
});
