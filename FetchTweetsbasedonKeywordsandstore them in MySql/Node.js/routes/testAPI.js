// new comment 
// new comment 2
//new comment 3
const logger = require('morgan');
var express=require("express");
var router= express.Router();
var mysql = require('mysql');
const cors = require('cors');
var Twitter = require('twitter');
var app=express();

var client = new Twitter({
  consumer_key: '*********',
  consumer_secret: '**********',
  access_token_key: '***********************',
  access_token_secret: '***********************'
});
var connect = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database:'test1',
  charset : 'utf8mb4'
});

var all_tweets = [];
var all_tweets2=["hi","hello","how"];
var tweet_term="";
var params = {screen_name: 'SrBachchan'};
//part 1 
/*client.get('statuses/user_timeline', params, function(error, tweets, response) 

{
  if (!error) {
    //console.log(tweets);
    for (i=0;i<tweets.length;i++)
   {
      all_tweets.push(tweets[i].text);
      var tweettext=tweets[i].text;
      var insert_R = 'INSERT INTO tweet_test_demo(tweettext) VALUE(?)';
     
      connect.getConnection(function(err, connection){				
        //Inserting a record into details
          connection.query(insert_R,[tweettext], function(err,res){
              if(err) throw err;
              else {
                      
                    
                      console.log('Details added successfully');
                      
    
              }
          });
          //releasing connection
          connection.release();
          
      });
        
     
      //console.log(tweets[i].text);
    }    
    
    //console.log(all_tweets);
  
    router.get("/",function(req,res,next)
{
    var hi="hello"
    res.send(all_tweets)
});
  }
});  */
// end of part1

// part 2 just checking
/*var filter_string='happy'
var stream = client.stream('statuses/filter', {track: filter_string});
stream.on('data', function(event) {
  var tweettext=event.text;
  all_tweets.push(event.text);
  var insert_R = 'INSERT INTO tweet_test_demo(tweettext) VALUE(?)';
  
  
 console.log(event.text);
 connect.getConnection(function(err, connection){				
  //Inserting a record into details
    connection.query(insert_R,[tweettext], function(err,res){
        if(err) throw err;
        else {
                
              
                console.log('Details added successfully');
                

        }
    });
    //releasing connection
    connection.release();
    
});


});
 
stream.on('error', function(error) {
  throw error;
});

*/


app.use(
  cors({
    origin: 'http://localhost:3000',  // temp changing http://localhost:3000
    credentials: true,
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var length_arr=all_tweets.length
  if(length_arr<10)
{
app.post('/', function(req, res) {
  
  const search_value = req.body.search_term;
  console.log("fghj");
  tweet_term=search_value;
  //all_tweets.push(search_value);
  console.log("twwet term");
  console.log(tweet_term);
  var stream = client.stream('statuses/filter', {track: tweet_term});
  stream.on('data', function(event) {
  var tweettext=event.text;
  //if(all_tweets.length<2)

  
  var insert_R = 'INSERT INTO tweet_test_demo2(tweettext) VALUE(?)';
  
  
 console.log(event.text);
 connect.getConnection(function(err, connection){				
  //Inserting a record into details
  

    connection.query(insert_R,[tweettext], function(err,res){
        if(err) throw err;
        else {
                console.log("alltweet",all_tweets);
                all_tweets.push(event.text);
                console.log('Details added successfully');
                
                

        }
    });
    //releasing connection
   // ig length
    connection.release();

});



});
 
stream.on('error', function(error) {
  throw error;
});

//} // if


});



} // if length

// temp 
app.get("/",function(req,res,next)
{
  console.log("I am inside get");
    var hi="hello"
    console.log("final all tweet");
    console.log("get alltweets",all_tweets)
    res.send(all_tweets)
    console.log("i workess sendinf res")


});   


module.exports=app;
//module.exports=router;