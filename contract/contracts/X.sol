// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract X {

    uint16  MAX_CHAR = 280; 
    // Struct
    struct Tweet {
        uint256 id;
        address author;
        string tweet;
        uint256 timestamp;
        uint256 likes;
    }
    mapping(address => Tweet[]) public  tweets;
    address public  owner;

    event TweetCreated(uint id , address author, string content , uint timestamp);
    event TweetLiked(address liker , address tweetAuthor , uint tweetId , uint newLikedCount);
    event TweetUnLiked(address unliker , address tweetAuthor , uint tweetId , uint newLikedCount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner , "NOT a owner");
        _;
    }
    function changeTweetLength(uint16 _newTweetLength) public onlyOwner{
        MAX_CHAR  = _newTweetLength;
    }
    function createTweet(string memory _tweet) public {
        require(bytes(_tweet).length <= MAX_CHAR , "Tweet is too long");
        Tweet memory newTweet = Tweet({
            id : tweets[msg.sender].length,
            author : msg.sender,
            tweet : _tweet,
            timestamp : block.timestamp,
            likes : 0
        });
        tweets[msg.sender].push(newTweet);
        emit TweetCreated(newTweet.id, newTweet.author, newTweet.tweet, newTweet.timestamp);
    }

    function likeTweet(address _author , uint256 _id) external {
        require(tweets[_author][_id].id == _id , "Tweet does not exits");
        tweets[_author][_id].likes++;
        emit TweetLiked(msg.sender, _author, _id, tweets[_author][_id].likes);
    }
    function dislikeTweet(address _author , uint256 _id) external {
        require(tweets[_author][_id].id == _id , "Tweet does not exits");
        require(tweets[_author][_id].likes > 0 , "Tweet has no Likes");
        tweets[_author][_id].likes--;
        emit TweetUnLiked(msg.sender, _author, _id, tweets[_author][_id].likes);
    }

    function getTweet(uint _i) public view returns(Tweet memory){
        return tweets[msg.sender][_i];
    }

    function getAllTweets(address _owner) public view returns(Tweet[] memory){
        return tweets[_owner];
    }
}