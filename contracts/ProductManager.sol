// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ProductManager {
    struct Product {
        string name;
        string description;
        address creator;
        uint256 createdAt;
        string imageUrl;
    }

    Product[] public products;

    event ProductAdded(string name, address indexed creator, uint256 timestamp);

    function addProduct(
        string memory _name, 
        string memory _description, 
        string memory _imageUrl
    ) public {
        products.push(Product({
            name: _name,
            description: _description,
            creator: msg.sender,
            createdAt: block.timestamp,
            imageUrl: _imageUrl
        }));

        emit ProductAdded(_name, msg.sender, block.timestamp);
    }

    function getAllProducts() public view returns (Product[] memory) {
        return products;
    }
}