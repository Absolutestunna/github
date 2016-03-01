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


/////////////////////////////////Capture input value///////////////////////////
$( ".input" ).on("keydown", function(event) {
  if (event.keyCode == 13){
    username = $(".input").val();
    startProgram();
  }
});
//////////////////////////////////////////////////////////////////////////////

/////////////////////////////////Repo Search///////////////////////////////////

//////////////////////////////////////////////////////////////////////////////


startProgram();
function startProgram(){
    function url(){
      return "https://api.github.com/users/" + username;
    }
    function urlTwo(){
      return "https://api.github.com/users/" + username + "/repos";
    }
    function urlOrgsFunc(){
      return "https://api.github.com/users/" + username + "/orgs";
    }

  if(typeof(githubtoken) !== "undefined"){
    $.ajaxSetup({
      headers: {
        'Authorization': 'token ' + githubtoken,
      }
    });
  }

  var source = $("#sidebar_info").html();
  var template = handlebars.compile(source);
  $.ajax(url()).then(function(data){
     context = {
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
      $(".smallPro .smallProfilePic").html('<img src="' + context.avatar_url + '">');
      $(".sidebar").html(template(context));

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
    var source2 = $("#repo-rep").html();
    var template2 = handlebars.compile(source2);
  $.ajax(urlTwo()).then(function(data){
    $(".repo-space").empty();
    var sorted = _.sortBy(data, "updated_at");
      _.each(sorted.reverse(), function(element){
         context2 = {
          name: element.name,
          updated_at: moment(element.updated_at).fromNow(),
          stargazers_count: element.stargazers_count,
          forks_count: element.forks_count,
          language: element.language,
        };
        $(".repo-space").append(template2(context2));
      });

    });
  }

  function orgsFunc(){
    var source3 = $("#side-org").html();
    var template3 = handlebars.compile(source3);
    $.ajax(urlOrgsFunc()).then(function(data){
      _.each(data, function(element){
        context3 = {
          orgs: element.avatar_url,
        }
      });
    $(".sidebar").append(template3(context3));
    })
  }
  function contFunc(){
    $(".repo-space").html('<h1>This space is under construction</h1>')
  }
  function actFunc(){
    $(".repo-space").html('<h1>This space is under construction</h1>')
  }

}//END OF STARTPROGRAM
