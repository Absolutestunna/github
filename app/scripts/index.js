var $ = require('jquery');
var _ = require('underscore');

var handlebars = require('handlebars');
var githubtoken = require('./githubtoken.js').token;
var username = "Absolutestunna";


var source = $("#sidebar_info").html();
var template = handlebars.compile(source);


var url = "https://api.github.com/users/" + username;
if(typeof(githubtoken) !== "undefined"){
  $.ajaxSetup({
    headers: {
      'Authorization': 'token ' + githubtoken,
    }
  });
}
$.ajax(url).then(function(data){
  console.log(data)
  var context = {
     name: data.name,
     avatar_url: data.avatar_url,
      blog: data.blog,
      location: data.location,
      email: data.email,
      html_url: data.html_url,
      login: data.login,
      location: data.location,
      blog: data.blog,
      followersNum: data.followers,
      followers: data.followers_url,
      followingNum: data.following,
      following: data.following_url,
      starred: data.starred_url,
      date: data.created_at,
      organizations: data.organizations,
    }
    $(".sidebar").append(template(context));

});
