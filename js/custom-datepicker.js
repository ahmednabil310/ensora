$(function () {
  $("#datepicker").datepicker({
    dateFormat: "dd-mm-yy",
    duration: "fast",
    showOn: "both",
    buttonText: "<i class='fas fa-calendar'></i>",
    showButtonPanel: true,
    dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
  });
});
