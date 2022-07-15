"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  const showStar = Boolean(currentUser);

  console.log(currentUser);
  
  return $(`
      <li id="${story.storyId}">
        <i class="far fa-star"></i>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function toggleFavorite(evt) {
  const storyId = $(evt.target).closest('li').attr('id');
  const story = storyList.stories.find(story => story.storyId === storyId);
  

  currentUser.isFavorite(story) ? currentUser.removeFavorite(story) : currentUser.addFavorite(story);
}

$storiesContainer.on('click', toggleFavorite);


async function submitStory(evt){
  console.debug("submitStory"); 
  evt.preventDefault(); 

  const author = $('#create-author').val();
  const title = $('#create-title').val();
  const url = $('#create-url').val();
  const user = currentUser.username
  const data = {author,url,title,user}

  const story = await storyList.addStory(currentUser, data); // storing data in the backend, good practice to await 

  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);

  $submitForm.hide();
};

$submitForm.on("submit",submitStory);


function putFavoritesListOnPage(){
  // $favoritesPage.empty(); // whats the purpose of this line?
  if(currentUser.favorites.length===0){
    $favoritesPage.append("<p>no favorites added</p>");
  } else {
    for(let fav of currentUser.favorites){
      const $fav = generateStoryMarkup(story);
      $favoritesPage.append($story);
    };
  }

  $favoritesPage.show();
}