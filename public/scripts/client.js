/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  // shows/hides new tweet section when clicked the arrow icon on navbar
  $("nav i").on("click", () => {
    $(".new-tweet").slideToggle();
    $(".new-tweet textarea").focus();
  });

  // gets tweets from the server and renders them on the page
  const createTweetElement = function (tweetContent) {
    // tweet article element which will be returned in the end
    const date = timeago.format(tweetContent.created_at);

    // tweet element's inner html
    const newTweet = `
    <div id = "tweet-box">
      <span class ="avatars" > <img class = "avatars" src = ${tweetContent.user.avatars} /></span>
      <span class = "user-name"><h3> ${tweetContent.user.name}</h3></span>
      <span class = "user-handle">${tweetContent.user.handle}</span>
      <p class="tweet-content">${tweetContent.content.text}</p>
  <footer class = "tweet-footer">
      <span>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </span>
      <div class = "time">  <time class="timeago" datetime="2021-12-18T09:24:17Z" title="8"></time></div>
     <time class="timeago" datetime="2021-12-18T09:24:17Z" title="8">${date}</time>
  </footer>
  </div>
  `;
    // return html
    return newTweet;
  };

  // adds all tweets to #tweets-container
  const renderTweets = function (tweetsDatabase) {
    //empty tweets from tweet form
    $("textarea#tweet-text").empty();
    // $("textarea#tweet-text").trigger("reset");

    // turn each tweet in database into an html element, and append them to container
    for (const tweet of tweetsDatabase) {
      const $tweet = createTweetElement(tweet);
      console.log($tweet);
      $("#tweet-container").prepend($tweet);
    }
  };
  const loadTweets = () => {
    $.ajax("/tweets", {
      method: "GET",
      dataType: "JSON",
    }).then(function (result) {
      renderTweets(result);
    });
  };

  loadTweets();
  $(".tweet-input").submit(function (event) {
    event.preventDefault();
    console.log($(this).serialize());

    const $errorMessage = $(this).children("h4");
    const tweetText = $("#tweet-text").val();

    $(".error").hide();

    if (tweetText.length < 1) {
      $(".tweet-error").html(
        '<span class="error">Please input some text. Input field cannot be blank!</span>'
      );
      $errorMessage.slideDown(300);
    } else if (tweetText.length > 140) {
      $(".tweet-error").html(
        '<span class="error">Please limit your tweet to 140 characters.</span>'
      );
      $errorMessage.slideDown(300);
    } else {
      // AJAX POST to server
      $.post("/tweets", $(this).serialize(), function (data) {
        loadTweets();
        tweetText.val(""); // clear textarea
        $(".counter").html("140"); // reset counter to 140
    
      });
    }
  });
});
