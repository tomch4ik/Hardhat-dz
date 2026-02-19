// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Blog {
    struct Post {
        uint256 id;
        address author;
        string content;
        uint256 likes;
        bool exists;
    }

    uint256 public postCount;
    mapping(uint256 => Post) public posts;
    mapping(uint256 => mapping(address => bool)) public hasLiked;

    function createPost(string memory _content) public {
        postCount++;
        posts[postCount] = Post(postCount, msg.sender, _content, 0, true);
    }

    function deletePost(uint256 _id) public {
        require(posts[_id].exists, "Post does not exist");
        require(posts[_id].author == msg.sender, "You are not the author");
        posts[_id].exists = false;
    }

    function toggleLike(uint256 _id) public {
        require(posts[_id].exists, "Post does not exist");
        if (hasLiked[_id][msg.sender]) {
            posts[_id].likes--;
            hasLiked[_id][msg.sender] = false;
        } else {
            posts[_id].likes++;
            hasLiked[_id][msg.sender] = true;
        }
    }

    function getAllPosts() public view returns (Post[] memory) {
        Post[] memory allPosts = new Post[](postCount);
        for (uint256 i = 1; i <= postCount; i++) {
            allPosts[i-1] = posts[i];
        }
        return allPosts;
    }
}