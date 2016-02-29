var $ = require('jquery');
var _ = require('underscore');
var handlebars = require('handlebars');
var moment = require('moment');
var context;
var context2;
var context3;
var orgs;

// var githubtoken = ("./githubtoken.js").token;
var githubtoken;
var username = "Absolutestunna";


///////////////////////Attempt to capture input value///////////////////////////
$( ".input" ).on( "keydown", function( event ) {
  if (event.which == 13){
    username = $(".input").val();
    startProgram();
  }
});
//////////////////////////////////////////////////////////////////////////////


startProgram();
function startProgram(){
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

  var source = $("#sidebar_info").html();
  var template = handlebars.compile(source);
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
        followersNum: data.followers,
        followers: data.followers_url,
        followingNum: data.following,
        following: data.following_url,
        starred: data.starred_url,
        date: moment(data.created_at).format("MMMM Do, YYYY"),
        organizations: data.organizations,
      }
      $(".smallPro .smallProfilePic").append('<img src="' + context.avatar_url + '">');
      $(".sidebar").append(template(context));

  }).then(orgsFunc);

  $(".repositories").on("click", function(){
    $(".contributions").removeClass("active");
    $(".activity").removeClass("active");
    repofunc();
  })
  $(".contributions").on("click", function(){
    $(".repositories").removeClass("active");
    $(".activity").removeClass("active");
    contFunc();
  })
  $(".activity").on("click", function(){
    $(".contributions").removeClass("active");
    $(".repositories").removeClass("active");
    actFunc();
  })
  repofunc();

  function repofunc(){
    $(".repo-space h1").remove();
    var source3 = $("#repo-rep").html();
    var templateNum = handlebars.compile(source3);
  $.ajax(url2).then(function(data){
    var sorted = _.sortBy(data, "updated_at");
    _.each(sorted.reverse(), function(element){
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
      orgs = data[0].avatar_url;
      $(".orgImgs a").append('<img src="' + orgs + '">');
    })
  }
  function contFunc(){
    $(".repo-space").html('<h1>This space is under construction</h1>')
  }
  function actFunc(){
    $(".repo-space").html('<h1>This space is under construction</h1>')
  }

}//END OF STARTPROGRAM
