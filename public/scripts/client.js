/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetContent) {
// tweet article element which will be returned in the end

// tweet element's inner html
    const newTweet =
`
 <header>
   <div>
    <span> <img src = ${(tweetContent.user.avatars)} /></span>
    <span> ${(tweetContent.user.name)}</span>
    <span>${(tweetContent.user.handle)}</span>
    </div>
</header>
    <p>${(tweetContent.content.text)}</p>
<footer>
    <span>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </span>

</footer>

`;
// return html 
return newTweet;

};

// adds all tweets to #tweets-container
const renderTweets = function(tweetsDatabase) {
  console.log(tweetsDatabase)
  
  // remove any tweets that are already in the container
  // $('#tweet-container').empty();
  
  // turn each tweet in database into an html element, and append them to container
  for (const tweet of tweetsDatabase) {
    const $tweet = createTweetElement(tweet);
    console.log($tweet)
    $('#tweet-container').prepend($tweet);
  }
}

// gets tweets from the server and renders them on the page

$(document).ready(function() {
  console.log('hello')
  const loadTweets = () => {
    $.ajax('/tweets', {
      method: 'GET',
      dataType: 'JSON',
    })
    .then(function(result) {
      renderTweets(result)
    })
  
  };
  loadTweets();
  $('.tweet-input').submit(function(event) {
    event.preventDefault();
    console.log($( this ).serialize() );

    // AJAX POST to server
      $.post("/tweets",
        $(this).serialize(),
        function(data) {
          loadTweets();
          $textArea.val(''); // clear textarea
          $('.counter').text('140'); // reset counter to 140
        })
  });

    // $('time.timeago').timeago();

// load all tweets when page is loaded

});

  // // shows/hides new tweet section when clicked the arrow icon on navbar
  // $('nav i').on('click', () => {
  //   $('.new-tweet').slideToggle();
  //   $('.new-tweet textarea').focus();
  // });

// $('i.fas.fa-heart').click(function () {
//     let form-icons = $(this).text();
//     alert(form-icons); // this prints something, now.
//     $(this).css("color", "red");
// });
