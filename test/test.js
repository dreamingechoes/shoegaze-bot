var expect = require('chai').expect;
var rewire = require("rewire");
var bot = rewire('../index.js');

pickTweet = bot.__get__('pickTweet');
tweetLengthOK = bot.__get__('tweetLengthOK');

describe('simple test', function() {
  it('should pass this simple test', function() {
    expect(true).to.eql(true);
  });
});

describe('pick song test', function() {
  it('it should return a song', function() {
    var song = pickTweet();
    expect(song).to.not.eql(undefined);
  });
});

describe('body length tests', function() {
  it('it should return true if body is = 170 char', function() {
    var testBody = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultricies dolor nulla, in maximus nisl faucibus non. Morbi viverra massa nunc. Lorem ipsum. Lorem ipsum dolo';
    var body = tweetLengthOK(testBody);
    expect(body).to.eql(true);
  });

  it('it should return true if body is <= 170 char', function() {
    var body = tweetLengthOK('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultricies dolor nulla, in maximus nisl faucibus non.');
    expect(body).to.eql(true);
  });

  it('it should return false if body is >= 170 char', function() {
    var testBody = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultricies dolor nulla, in maximus nisl faucibus non. Morbi viverra massa nunc. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum.';
    var body = tweetLengthOK(testBody);
    expect(body).to.eql(false);
  });
});
