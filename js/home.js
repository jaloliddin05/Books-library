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
let elVisibleBooksNumber = document.querySelector(".visible_books_number");
let elAllBooksNumber = document.querySelector(".all_books_number");
let fetchedArray;
//................................................................
let API_URL = `https://www.googleapis.com/books/v1/volumes?q=`;
let search_item;
//...........................................
//  GET YEAR
const getYear = (time) => new Date(time).getFullYear();
//........................................................
//  RENDER BOOKS
const renderBooks = function (arr, place) {
  elBooksList.innerHTML = null;
  //.....
  fetchedArray = returnArr = () => arr.items;
  //.....
  elVisibleBooksNumber.textContent = arr.items.length;
  elAllBooksNumber.textContent = arr.totalItems;
  //.....
  arr.items.forEach((book) => {
    let card = `
    <li class="books_card_item">
    <div class="books_card_img_box">
      <img
        src="${book.volumeInfo.imageLinks?.smallThumbnail}"
        alt=""
        width="201"
        height="202"
        class="books_card_img"
      />
    </div>
    <p class="books_card_name">${book.volumeInfo?.title}</p>
    <p class="books_card_author">${book.volumeInfo?.authors?.join(", ")}</p>
    <p class="books_card_year">${getYear(book.volumeInfo?.publishedDate)}</p>
    <div class="books_card_bottom">
    <div class="books_card_btn_box">
      <button class="bookmark_btn" data-bookmark-Add-Id=${
        book?.id
      }>Bookmark</button>
      <button class="more_info_btn" data-moreinfo=${
        book?.id
      }>More Info </button>
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
  let response = await fetch(API_URL + bookname);
  let bookObj = await response?.json();
  renderBooks(bookObj, elBooksList);
};
getInfoBooks("python");

// MODAL CLOSING
elModalCloseBtn.addEventListener("click", function () {
  elModal.classList.add("visually-hidden");
  elOverly.classList.add("visually-hidden");
  document.body.setAttribute("style", "overflow-y:visible");
});
elOverly.addEventListener("click", function () {
  elModal.classList.add("visually-hidden");
  elOverly.classList.add("visually-hidden");
  document.body.setAttribute("style", "overflow-y:visible");
});
//......................
//  MODAL.....MODAL.....MODAL.....MODAL.....MODAL.....MODAL
elBooksList.addEventListener("click", function (evt) {
  if (evt.target.matches(".more_info_btn")) {
    fetchedArray().forEach((book) => {
      if (evt.target.dataset.moreinfo == book.id) {
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
        document.body.setAttribute("style", "overflow-y:hidden");
      }
    });
  }
});

//  GETTING INPUT VALUE
elSearchInput.addEventListener("keyup", function () {
  search_item = elSearchInput.value;
  if (search_item != "") {
    getInfoBooks(search_item);
  } else {
    elAllBooksNumber.textContent = "0";
    elVisibleBooksNumber.textContent = "0";
  }
});
// BOOKMARK RENDER
let bookmarkArray = [];

let renderBookmark = function (arr, place) {
  elBookmarkList.innerHTML = null;
  arr.forEach((book) => {
    let card = `
        <li class="bookmark__item">
        <div class="bookmark_book_info_box">
          <h3 class="bookmark_book_name">${book.volumeInfo.title}</h3>
          <p class="bookmark_book_author">John Doe</p>
        </div>
        <div class="bookmark_item_btn_box">
          <a href=${book.volumeInfo.previewLink} target="blank" class="bookmark_read_book_btn"></a>
          <button class="bookmark_book_delete_btn" data-remove-Bookmark-Id=${book.id}></button>
        </div>
      </li>
        `;
    place.insertAdjacentHTML("beforeend", card);
  });
};
//
//  BOOKMARK PUSH
elBooksList.addEventListener("click", function (evt) {
  if (evt.target.matches(".bookmark_btn")) {
    fetchedArray().forEach((book) => {
      if (
        evt.target.dataset.bookmarkAddId == book.id &&
        !bookmarkArray.includes(book)
      ) {
        bookmarkArray.push(book);
      }
    });
    renderBookmark(bookmarkArray, elBookmarkList);
  }
});
// BOOKMARK REMOVE
elBookmarkList.addEventListener("click", function (evt) {
  if (evt.target.matches(".bookmark_book_delete_btn")) {
    let removedBookmarkIndex = bookmarkArray.findIndex(
      (book) => evt.target.dataset.removeBookmarkId == book.id
    );
    bookmarkArray.splice(removedBookmarkIndex, 1);
    renderBookmark(bookmarkArray, elBookmarkList);
  }
});
// REMOVE LOCALSTORAGE ITEM

elLogoutBtn.addEventListener("click", function () {
  window.localStorage.removeItem("token");
});

//  ORDER BY
elOrderByBtn.addEventListener("click", function () {
  getInfoBooks(search_item + "&orderBy=newest");
});
// DARKMODE

elDarkModeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");
});
