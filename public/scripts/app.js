/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery"s document ready function
 */

$(() => {
  const createTweetElement = (tweet) => {
    let articleElem = $("<article>");
    articleElem.addClass("tweet");

    let headerElem = $("<header>");

    let userDiv = $("<div>");
    userDiv.addClass("user");

    let avatarImg = $("<img>");
    avatarImg.attr("src", tweet.user.avatars);
    avatarImg.attr("alt", "avatar.png");

    let nameLabel = $("<label>");
    nameLabel.addClass("name");
    nameLabel.text(tweet.user.name);

    userDiv.append(avatarImg);
    userDiv.append(nameLabel);

    let handlerLabel = $("<label>");
    handlerLabel.addClass("handler");
    handlerLabel.text(tweet.user.handle);

    let content = $("<p>");
    content.addClass("tweetPara");
    content.text(tweet.content.text);

    let footer = $("<footer>");
    let footerP = $("<p>");

    let footerButtons = $("<div>");
    let flagButton = $("<button>");
    let retweetButton = $("<button>");
    let likeButton = $("<button>");

    let flagIcon = $("<i>");
    flagIcon.addClass("fa fa-flag");
    flagButton.append(flagIcon);

    let retweetIcon = $("<i>");
    retweetIcon.addClass("fa fa-retweet");
    retweetButton.append(retweetIcon);

    let likeIcon = $("<i>");
    likeIcon.addClass("fa fa-heart");
    likeButton.append(likeIcon);

    footerButtons.append(flagButton);
    footerButtons.append(retweetButton);
    footerButtons.append(likeButton);

    footer.append(footerP);
    footer.append(footerButtons);
    footerP.text(`${calculateDaysAgo(tweet.created_at)} days ago`);

    headerElem.append(userDiv);
    headerElem.append(handlerLabel);
    articleElem.append(headerElem);

    articleElem.append(content);
    articleElem.append(footer);

    return articleElem;
  };

  const renderTweets = (tweets) => {
    let reverseTweets = tweets.reverse();
    $("#tweets-container").empty();
    for(let tweet in reverseTweets) {
      const $tweet = createTweetElement(tweets[tweet]);
      $("#tweets-container").append($tweet);
    }
  };

  const calculateDaysAgo = (time) => {

    var oneDay = 24*60*60*1000; //milliseconds
    var firstDate = new Date();
    var secondDate = new Date(time);
    
    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));  
    return diffDays;  
  };

  const loadTweets = (cb) => {
    $.ajax({
      url: "/tweets",
      type: "GET"
    })
    .then(data => cb(data));
  };

  const loadError = (message) => {
    const error = $(".error");
    error.empty();
    const errorMessage = $("<p>");
    errorMessage.text(message);
    error.append(errorMessage);
    error.slideDown();
  }

  const unloadError = () => {
    const error = $(".error");
    error.slideUp();
  }

  $("#tweets-form").on("submit", function(evt) {
    evt.preventDefault();
    let data = $(this).serialize();

    let wordCount = $(this).find("textarea").val().length;

    unloadError();
    //data validation
    setTimeout(() => {
      if (!wordCount) {
        loadError("❗ Your content is not present. ❗");
      } else if (wordCount > 140) {
        loadError("❗ Your message is too long. ❗");
      } else {
        $.ajax({
          data,
          url: "/tweets",
          type: "POST"
        })
        .then(() => {
          loadTweets(data => renderTweets(data));
        });
        $(this).find("textarea").val("");
        unloadError();
      }
    }, 300);
  });

  const hideButton = () => {
    $(".new-tweet-form").slideToggle(200);
    $("#tweets-form").find("textarea").focus();
  };


  $("#nav-button").on('click', (evt) => {
    hideButton();
  });

  loadTweets(data => renderTweets(data));
});