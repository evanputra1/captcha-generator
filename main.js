// Memilih elemen DOM yang diperlukan
const captchaTextBox = document.querySelector(".captcha input");
const refreshButton = document.querySelector(".refresh");
const captchaInputBox = document.querySelector(".captcha-input input");
const message = document.querySelector(".message");
const submitButton = document.querySelector(".button");

// Variabel untuk menyimpan captcha yang dihasilkan
let captchaText = null;

// Fungsi untuk menghasilkan captcha
const generateCaptcha = () => {
  const randomString = Math.random().toString(36).substring(2, 8);
  const randomStringArray = randomString.split("");
  const changeString = randomStringArray.map((char) => (Math.random() > 0.5 ? char.toUpperCase() : char));
  captchaText = changeString.join("   ");
  captchaTextBox.value = captchaText;
  console.log(captchaText);
};

const refreshBtnClick = () => {
  generateCaptcha();
  captchaInputBox.value = "";
  captchaKeyUpValidate();
};

const captchaKeyUpValidate = () => {
  //Mengalihkan tombol submit
  submitButton.classList.toggle("disabled", !captchaInputBox.value);

  if (!captchaInputBox.value) message.classList.remove("active");
};

// Fungsi untuk memvalidasi captcha yang dimasukkan
const submitBtnClick = () => {
  captchaText = captchaText
    .split("")
    .filter((char) => char !== " ")
    .join("");
  message.classList.add("active");
  setTimeout (function() {
    message.classList.remove("active");
  },1000);
  // Periksa apakah teks captcha yang dimasukkan sudah benar atau salah
  if (captchaInputBox.value === captchaText) {
    message.innerText = "Captcha yang dimasukan benar.";
    message.style.color = "black";
  } else {
    message.innerText = "Captcha yang dimasukan salah.";
    message.style.color = "#FF2525";
  }
};

// addEventListener untuk tombol refresh, submit dan captcha input
refreshButton.addEventListener("click", refreshBtnClick);
captchaInputBox.addEventListener("keyup", captchaKeyUpValidate);
submitButton.addEventListener("click", submitBtnClick);

// Hasilkan captcha saat halaman dimuat
generateCaptcha();