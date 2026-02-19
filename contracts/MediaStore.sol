// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MediaStore {
    struct Media {
        uint256 id;
        string url;      
        string title;    
        address owner;  
        bool isDeleted;  
    }

    uint256 public mediaCount;
    mapping(uint256 => Media) public mediaItems;

    function addMedia(string memory _url, string memory _title) public {
        mediaCount++;
        mediaItems[mediaCount] = Media(mediaCount, _url, _title, msg.sender, false);
    }

    function deleteMedia(uint256 _id) public {
        require(mediaItems[_id].owner == msg.sender, "You are not the owner");
        mediaItems[_id].isDeleted = true;
    }

    function getAllMedia() public view returns (Media[] memory) {
        Media[] memory allItems = new Media[](mediaCount);
        for (uint256 i = 1; i <= mediaCount; i++) {
            allItems[i-1] = mediaItems[i];
        }
        return allItems;
    }
}