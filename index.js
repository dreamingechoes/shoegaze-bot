var Twit = require('twit'),
    wordfilter = require('wordfilter'),
    T = new Twit(require('botfiles/config.js'));

// Functions
function randomIntByModulo(min, max) {
  var i = (Math.random() * 32768) >>> 0;
  return (i % (min - max)) + min;
}

function tweetLengthOK(body) {
  // We increase the max. number of characters cause the Spotify song's URL
  if (body.length <= 170) {
    return true;
  } else {
    return false;
  }
}

function pickTweet() {
  var tweetBody = pickSong();
  if (tweetLengthOK(tweetBody)) {
    return tweetBody;
  } else {
    tweetBody = pickTweet();
  }
}

function pickSong() {
  var playlist = require('botfiles/playlist.js'),
      index = randomIntByModulo(0, playlist.items.length);
  return playlist.items[index].track.artists[0].name + " · " + playlist.items[index].track.name +
  " (from the album '" + playlist.items[index].track.album.name + "') #Shoegaze #Dreampop #Bot " +
  playlist.items[index].track.external_urls.spotify;
}

// Main function to execute on AWS Lambda
exports.handler = function ShoegazeBot(event, context) {
  var textToTweet = pickTweet();

  T.post('statuses/update', {
    status: textToTweet
  }, function(err, reply) {
    if (err) {
      console.log('error:', err);
      context.fail();
    } else {
      console.log('tweet:', reply);
      context.succeed();
    }
  });
};
