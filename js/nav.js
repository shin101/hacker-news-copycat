"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();

}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  $loginSection.hide();
}

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $loginForm.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}


function navSubmitStory(evt) {
console.debug("navSubmitStory", evt); // its like console log but hides by default in chrome
hidePageComponents();
putStoriesOnPage();
$submitForm.show();
}

$navSubmitButton.on("click", navSubmitStory);


function navFavorites(evt){
  console.debug("navFavorites", evt); 
  hidePageComponents();
  putFavoritesListOnPage();
}

$navFavoriteButton.on("click", navFavorites);

function navMyPosts(evt){
  console.debug("navMyPosts", evt); 
  hidePageComponents();
  putMyStoriesListOnPage();
}

$navMyPostsButton.on("click", navMyPosts);