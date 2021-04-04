$(function () {
  $("#datepicker").datepicker({
    duration: "fast",
    showOn: "both",
    buttonText: "<i class='fas fa-calendar'></i>",
    showButtonPanel: true,
    dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
    currentText: "Cancel",
  });
});

$.datepicker._gotoToday = $.datepicker._clearDate;
