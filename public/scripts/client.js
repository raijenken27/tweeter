/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

  // Function to render tweets on the page
  const renderTweets = function(tweets) {
    // Clear the tweets container to refresh it
    $(".tweets-container").empty();
    // Loop through tweets and append each one to the container
    tweets.forEach(tweet => {
      const tweetElement = createTweetElement(tweet);
      $(".tweets-container").prepend(tweetElement);
    });
  };

  // Function to create an HTML element for a given tweet object
  const createTweetElement = function(tweet) {
    // Escape function to prevent XSS attacks via tweet.content.text
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    // Construct the tweet HTML element
    let $tweet = $(`
      <article class="tweet">
        <header>
          <span>
            <img src=${tweet.user.avatars}>
            &nbsp${tweet.user.name}
          </span>
          <small>
            ${tweet.user.handle}
          </small>
        </header>
        <p>
          ${escape(tweet.content.text)}
        </p>
        <footer>
          <div>
            ${timeago.format(tweet.created_at)}
          </div>
          <div class="action">
            <i class="fa-solid fa-flag"></i> &nbsp; 
            <i class="fa-solid fa-retweet"></i> &nbsp;
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
    return $tweet;
  };

  // Function to load tweets from the server (/tweets/) and render them
  const loadTweets = function() {
    $.ajax('/tweets/', { method: 'GET' })
      .done(function(data) {
        renderTweets(data);
      });
  };

  // Form submission handler
  $(function() {
    const $form = $('.new-tweet form');
    $form.on('submit', function(event) {
      event.preventDefault();
      const queryString = $(this).serialize();
      const charCounter = $(".counter");
      const tweetLength = $(charCounter).html();

      // Check for invalid tweet length
      if (tweetLength >= 140) {
        $("#error").slideUp(() => {
          $("#error").html("\⚠️ Cannot post an empty tweet! \⚠️").slideDown();
        });
        return;
      }
      if (tweetLength < 0) {
        $("#error").slideUp(() => {
          $("#error").html("\⚠️ Maximum tweet length exceeded! \⚠️").slideDown();
        });
        return;
      }

      // Send tweet to the server
      $.ajax('/tweets/', { method: 'POST', data: queryString })
        .done(() => {
          // After posting to the server: reload tweets, clear form, reset counter, and hide error
          loadTweets();
          $("textarea").val("");
          $(".counter").html('140');
          $("#error").slideUp();
        });
    });
  });

  // Initial load of tweets
  loadTweets();

});