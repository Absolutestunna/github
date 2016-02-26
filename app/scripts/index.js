var $ = require('jquery');
var _ = require('underscore');
var handlebars = require('handlebars');
var moment = require('moment');
var context;
var context2;
var orgs;


var githubtoken = require('./githubtoken.js').token;
var username = "Absolutestunna";


var source = $("#sidebar_info").html();
var template = handlebars.compile(source);


var url = "https://api.github.com/users/" + username;  //  /orgs
var urlOrgs = "https://api.github.com/users/" + username + "/orgs";
var url2 = "https://api.github.com/users/" + username + "/repos";

if(typeof(githubtoken) !== "undefined"){
  $.ajaxSetup({
    headers: {
      'Authorization': 'token ' + githubtoken,
    }
  });
}
$.ajax(url).then(function(data){
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
    console.log(moment(context.date).format())
    $(".sidebar").append(template(context));

});

$(".repositories").on('click', repofunc);


var source2 = $("#body-info").html();
var templateNum = handlebars.compile(source2);
function repofunc(){
$.ajax(url2).then(function(data){
  console.log(data)
  _.each(data, function(element){
     context2 = {
      name: element.name,
      updated_at: moment(element.updated_at).fromNow(),
      stargazers_count: element.stargazers_count,
      forks_count: element.forks_count,
      language: element.language,
    };
    $(".repo-space").append(templateNum(context2));
  });

  });

}

$.ajax(urlOrgs).then(function(data){
  console.log(data)
  // console.log(data[0].avatar_url)
  orgs = data[0].avatar_url;
  // $(".orgImgs").append('<img src="'+orgs+'">'')
  $(".orgImgs").append('<img src="' + orgs + '">');
})
