/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  const createTweetElement = (tweet) => {
    let articleElem = $("<article>");
    articleElem.addClass("tweet");

    let headerElem = $("<header>");

    let userDiv = $("<div>");
    userDiv.addClass("user");

    let avatarImg = $("<img>");
    avatarImg.attr('src', tweet.user.avatars);
    avatarImg.attr('alt', "avatar.png");

    let nameLabel = $("<label>");
    nameLabel.addClass("name");
    nameLabel.text(tweet.user.name);

    userDiv.append(avatarImg);
    userDiv.append(nameLabel);

    let handlerLabel = $("<label>");
    handlerLabel.addClass("handler");
    handlerLabel.text(tweet.user.handle);

    let content = $("<p>");
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
    for(let tweet in tweets) {
      console.log(tweets[tweet]);
      const $tweet = createTweetElement(tweets[tweet]);
      $('#tweets-container').append($tweet);
    }
  }

  const calculateDaysAgo = (time) => {
    return new Date(time).getDate() - (new Date).getDate();
  }

  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = [{
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Bob",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@Bob"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }
]

  renderTweets(tweetData);

});