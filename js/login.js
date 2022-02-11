let elUserNameInput = document.querySelector(".username_input");
let elUserPAsswordInput = document.querySelector(".userPassword_input");
let elLoginForm = document.querySelector(".login_form");
let mistake = document.querySelector(".error");
let elLoginBtn = document.querySelector(".login_btn");
//.........................

elLoginForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const usernameValue = elUserNameInput.value;
  const passwordValue = elUserPAsswordInput.value;

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: usernameValue,
      password: passwordValue,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data?.token) {
        window.localStorage.setItem("token", data.token);
        window.location.replace("home.html");
        elLoginBtn.style.backgroundColor = "greenyellow";
      } else {
        elUserNameInput.setAttribute("style", "border-color:red;");
        elUserPAsswordInput.setAttribute("style", "border-color:red;");
        mistake.classList.remove("visually-hidden");
        elLoginBtn.style.backgroundColor = "red";
      }
    });

  elUserNameInput.value = "";
  elUserPAsswordInput.value = "";
});

elUserNameInput.addEventListener("keydown", function () {
  elUserNameInput.setAttribute("style", "border-color:white;");
  mistake.classList.add("visually-hidden");
  elLoginBtn.style.backgroundColor = "white";
});
elUserPAsswordInput.addEventListener("keydown", function () {
  elUserPAsswordInput.setAttribute("style", "border-color:white;");
  mistake.classList.add("visually-hidden");
  elLoginBtn.style.backgroundColor = "white";
});
