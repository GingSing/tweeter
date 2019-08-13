/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  const createTweetElement = (tweetObj) => {
    let articleElem = $("<article>");
    articleElem.addClass("tweet");

    let headerElem = $("<header>");

    let userDiv = $("<div>");
    userDiv.addClass("user");

    let avatarImg = $("<img>");
    avatarImg.attr('src', tweetObj.user.avatars);
    avatarImg.attr('alt', "avatar.png");

    let nameLabel = $("<label>");
    nameLabel.addClass("name");
    nameLabel.text(tweetObj.user.name);

    userDiv.append(avatarImg);
    userDiv.append(nameLabel);

    let handlerLabel = $("<label>");
    handlerLabel.addClass("handler");
    handlerLabel.text(tweetObj.user.handle);

    let content = $("<p>");
    content.text(tweetObj.content.text);

    let footer = $("<footer>");
    footer.text(`${calculateDaysAgo(tweetObj.created_at)} days ago`)

    headerElem.append(userDiv);
    headerElem.append(handlerLabel);
    articleElem.append(headerElem);

    articleElem.append(content);
    articleElem.append(footer);

    return articleElem;
  };

  const calculateDaysAgo = (time) => {
    return new Date(time).getDate() - (new Date).getDate();
  }

  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});