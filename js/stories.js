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

function generateStoryMarkup(story, showDelete = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  const isFavorited = currentUser.favorites.some(favorite => favorite.storyId === story.storyId);
  
  return $(`
      <li id="${story.storyId}">
        ${showDelete 
          ? `<i class="fas fa-trash"></i>` 
          : `<i class="${isFavorited ? "fas" : "far"} fa-star"></i>`
        }
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

async function toggleFavoriteStar(evt) {
  const storyId = $(evt.target).closest('li').attr('id');
  const isFavorite = await currentUser.toggleFavoriteStory(storyId);

  const star = $(evt.target).closest('.fa-star');
  star.attr('class', isFavorite ? 'fas fa-star' : 'far fa-star');
}

$storiesContainer.on('click', '.fa-star', toggleFavoriteStar);

async function deleteStoryTrash(evt) {
  const storyId = $(evt.target).closest('li').attr('id');
  await storyList.deleteStory(currentUser, storyId);
  navMyPosts();
}

$myStories.on('click', '.fa-trash', deleteStoryTrash);


async function submitStory(evt){
  console.debug("submitStory"); 
  evt.preventDefault(); 

  const author = $('#create-author').val();
  const title = $('#create-title').val();
  const url = $('#create-url').val();
  const data = { author, url, title };

  const story = await storyList.addStory(currentUser, data); // storing data in the backend, good practice to await 

  const $story = generateStoryMarkup(story);

  console.log($story);
  $allStoriesList.prepend($story);

  $submitForm.hide();
};

$submitForm.on("submit",submitStory);


function putFavoritesListOnPage(){
  $favoritesStories.empty();
  if(currentUser.favorites.length===0){
    $favoritesStories.append("<p>no favorites added</p>");
  } else {
    for(let fav of currentUser.favorites){
      const $fav = generateStoryMarkup(fav);
      $favoritesStories.append($fav);
    };
  }

  $favoritesStories.show();
}

function putMyStoriesListOnPage(){
  $myStories.empty();
  if(currentUser.ownStories.length===0){
    $myStories.append("<p>no stories added</p>");
  } else {
    for(let story of currentUser.ownStories){
      const $story = generateStoryMarkup(story, true);
      $myStories.append($story);
    };
  }

  $myStories.show();
}