// src/components/MediaCard.jsx
import React from 'react';

const MediaCard = ({ item, onDelete, currentAccount }) => {
    if (item.isDeleted) return null;

    return (
        <div className="card" style={styles.card}>
            <img src={item.url} alt={item.title} style={styles.image} />
            <div style={styles.info}>
                <h3>{item.title}</h3>
                <p>Owner: {item.owner.slice(0, 6)}...{item.owner.slice(-4)}</p>
                
                {currentAccount.toLowerCase() === item.owner.toLowerCase() && (
                    <button onClick={() => onDelete(item.id)} style={styles.deleteBtn}>
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
};

const styles = {
    card: { border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    image: { width: '100%', height: '200px', objectFit: 'cover' },
    info: { padding: '15px' },
    deleteBtn: { backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', marginTop: '10px' }
};

export default MediaCard;