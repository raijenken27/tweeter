$(document).ready(function() {
  $(".new-tweet form textarea").on("input", function() {
    const $textarea = $(this);
    const textLength = $textarea.val().length;
    const remainingCharacters = 140 - textLength;
    const $counter = $textarea.closest(".new-tweet").find(".counter");

    // Update the counter text
    $counter.text(remainingCharacters);
    
    if (remainingCharacters < 0) {
      $counter.addClass("red-text");
    } else {
      $counter.removeClass("red-text");
    }
  });
});
