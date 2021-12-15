$(document).ready(function () {
  // tweet input area
  const $textArea = $("#tweet-text");

  $textArea.on("input", function (e) {
    console.log($(this).val());
    const count = $(this).val().length;
    if (count > 140) {
      $(".counter").html(140 - count);
      $(".counter").css("color", "red");
    } else {
      $(".counter").html(140 - count);
      $(".counter").css("color", "inherit");
    }
  });
});
