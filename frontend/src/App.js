// src/App.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import MediaCard from './components/MediaCard';
import './App.css';

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_url", "type": "string" },
      { "internalType": "string", "name": "_title", "type": "string" }
    ],
    "name": "addMedia",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_id", "type": "uint256" }
    ],
    "name": "deleteMedia",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllMedia",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "id", "type": "uint256" },
          { "internalType": "string", "name": "url", "type": "string" },
          { "internalType": "string", "name": "title", "type": "string" },
          { "internalType": "address", "name": "owner", "type": "address" },
          { "internalType": "bool", "name": "isDeleted", "type": "bool" }
        ],
        "internalType": "struct MediaStore.Media[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mediaCount",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "mediaItems",
    "outputs": [
      { "internalType": "uint256", "name": "id", "type": "uint256" },
      { "internalType": "string", "name": "url", "type": "string" },
      { "internalType": "string", "name": "title", "type": "string" },
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "bool", "name": "isDeleted", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

function App() {
    const [mediaItems, setMediaItems] = useState([]);
    const [account, setAccount] = useState("");
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");

    const connectWallet = async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
        }
    };

    const loadMedia = async () => {
        if (!window.ethereum) return;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
        
        const data = await contract.getAllMedia();
        setMediaItems(data);
    };

    const addMedia = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        const tx = await contract.addMedia(url, title);
        await tx.wait();   
        setUrl("");
        setTitle("");
        await loadMedia();
    };

    const deleteMedia = async (id) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        const tx = await contract.deleteMedia(id);
        await tx.wait();
        
        await loadMedia(); 
    };

    useEffect(() => {
        connectWallet();
        loadMedia();
    }, []);

    return (
        <div className="App" style={{ padding: '20px' }}>
            <h1>Web3 Media Gallery</h1>
            <p>Ваш акаунт: {account}</p>

            <div className="upload-form" style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
                <input placeholder="URL зображення" value={url} onChange={(e) => setUrl(e.target.value)} />
                <input placeholder="Назва" value={title} onChange={(e) => setTitle(e.target.value)} />
                <button onClick={addMedia}>Додати фото</button>
            </div>

            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {mediaItems.map((item, index) => (
                    <MediaCard 
                        key={index} 
                        item={item} 
                        onDelete={deleteMedia} 
                        currentAccount={account} 
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
