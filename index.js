var async = require("async");
var moment = require("moment"); 
const cheerio = require('cheerio')
var fs = require("fs");
//var url = "https://app.roll20.net/campaigns/chatarchive/1915632";

fs.readFile(__dirname + '/archive.html','utf8' ,function(err, html){

    if(err) {
        console.log(err);
    } else {
        var $ = cheerio.load(html); 
        startProcess($); 
    }
});

function startProcess($) {
  $("div.diceroll.d20").each(function(i, element) {
    //get parent to get timestamp.
    // var parentNode = $(element).parent(".message");
    // var timestamp = $(parentNode).find(".tstamp"); 
    // if(!timestamp) {
    //   $(parentNode).prevUntil(".message .tstamp");
    // }

    $(element).find(".didroll").each(function(ii, rolledDie) {
      console.log($(rolledDie).text()); 
    });
  });
}