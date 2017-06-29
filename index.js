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
  console.log("timestamp\tperson\tdietype\tdieroll"); 
  var timestamp; 
  var person; 
  $(".message").each(function(messageNum, message) {
    //console.log("...processing message #" + messageNum); 
    //not all messages have timestamps. 
    if($(message).children(".tstamp").length) {
      timestamp = $(message).find(".tstamp").text(); 
      //console.log("...found a new timestamp" + timestamp); 
    }

    //not all messages have the person's name
    if($(message).children(".by").length) {
      person = $(message).find(".by").text(); 
      //console.log("...found a new person" + person); 
    }

    //lets get the d20 rolls in this message, if any. 
    if($(message).is(".rollresult")) {
      //console.log("...we can expect rolls here."); 

      //this message has some dicerolls in it. 
      //lets loop all of the common dice and grab their rolls. 
      for(var die = 1; die <= 20; die++) {
        //console.log("...looking for d" + die); 
        if($(message).find(".diceroll.d" + die).length) {
          //console.log("...found d" + die + "!"); 
          var diceroll = $(message).find(".diceroll.d" + die); 

          $(diceroll).each(function(rollNumber, roll) {
            var result = $(roll).find(".didroll").text();
            console.log(timestamp + "\t" + person + "\t" + die + "\t" + result); 
          });
        }
      }
    }
  });
}