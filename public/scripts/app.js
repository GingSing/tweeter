/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweetObj) => {
  let articleElem = $("<article>");
  articleElem.addClass("tweet");

  let headerElem = $("<header>");

  let nameLabel = $("<label>");
  nameLabel

  let handlerLabel = $("<handler>");

  let content = $("<p>");

  let footer = $("<footer>");

  headerElem.append(nameLabel);
  headerElem.append(handlerLabel);
  headerElem.append(content);
  headerElem.append(footer);
  article.append(headerElem);


  <article class="tweet">
            <header>
              <label class="name">Newton</label>
              <label class="handler">@SirIsaac</label>
            </header>
            <p>Wow! What a tweeterific app!</p>
            <footer>10 days ago</footer>
          </article>
};