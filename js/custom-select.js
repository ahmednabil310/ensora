for (const dropdown of document.querySelectorAll(
  ".our-custom-select-wrapper"
)) {
  dropdown.addEventListener("click", function () {
    this.querySelector(".our-custom-select").classList.toggle("open");
  });
}

for (const option of document.querySelectorAll(".custom-option")) {
  option.addEventListener("click", function () {
    if (!this.classList.contains("selected")) {
      this.parentNode
        .querySelector(".custom-option.selected")
        .classList.remove("selected");
      this.classList.add("selected");
      this.closest(".our-custom-select").querySelector(
        ".our-custom-select__trigger span"
      ).innerHTML = this.innerHTML;
    }
  });
}
window.addEventListener("click", function (e) {
  for (const select of document.querySelectorAll(".our-custom-select")) {
    if (!select.contains(e.target)) {
      select.classList.remove("open");
    }
  }
});
