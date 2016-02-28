var $ = require('jquery');
var _ = require('underscore');
var handlebars = require('handlebars');
var moment = require('moment');
var context;
var context2;
var context3;
var orgs;


var githubtoken = require('./githubtoken.js').token;
var username = "Absolutestunna";


var source = $("#sidebar_info").html();
var template = handlebars.compile(source);


var url = "https://api.github.com/users/" + username;
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
  // console.log(data)
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
      // $(".smallPro .smallProfilePic").append('<img src="' + avatar_url + '">');
    }
    console.log(context.avatar_url)
    $(".sidebar").append(template(context));

}).then(orgsFunc);

$(".repositories").on('click', repofunc);

function repofunc(){
  var source2 = $("#repo-info").html();
  var templateinfo = handlebars.compile(source2);
  $(".rep-tab").append(templateinfo);


  var source3 = $("#repo-rep").html();
  var templateNum = handlebars.compile(source3);
$.ajax(url2).then(function(data){
  console.log(data)
  _.each(data, function(element){
     context3 = {
      name: element.name,
      updated_at: moment(element.updated_at).fromNow(),
      stargazers_count: element.stargazers_count,
      forks_count: element.forks_count,
      language: element.language,
    };
    $(".repo-space").append(templateNum(context3));
  });

  });

}

function orgsFunc(){
  $.ajax(urlOrgs).then(function(data){
    // console.log(data)
    orgs = data[0].avatar_url;
    $(".orgImgs a").append('<img src="' + orgs + '">');
  })
}
