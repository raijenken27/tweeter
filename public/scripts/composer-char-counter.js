// This script, executed when the DOM has fully loaded, monitors the input events on all textarea elements.
$(document).ready(function() {
  $("textarea").on('input', function() {
    // 'tweetElement' represents the current textarea element, and 'tweetObject' is its corresponding jQuery object.
    const tweetElement = this;
    const $var = $(tweetElement); // Rename 'tweetObject' to '$var' for consistency.
    
    // Calculate the length of the text within the textarea and update the remaining character count.
    const tweetLength = $var.val().length;
    let remainingChars = 140 - tweetLength;

    // Access the counter by traversing the DOM tree, starting from the textarea's parent.
    const formObject = $var.parent();
    const counterObject = formObject.find(".counter");

    // Set the counter's value based on the remaining characters.
    counterObject.text(remainingChars);

    // Check and apply styling based on the remaining character count.
    if (remainingChars < 0) {
      counterObject.addClass("long");
    }
    if (remainingChars >= 0) {
      counterObject.removeClass("long");
    }
  });
});
