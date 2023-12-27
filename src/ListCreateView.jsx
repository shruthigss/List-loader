// ListCreationView.js

import React, { useState } from 'react';

const ListCreationView = ({ selectedLists, onCancel, onUpdate, onMoveItem }) => {
  const [newListItems, setNewListItems] = useState([]);

  const handleMoveItem = (itemIndex, direction) => {
    const updatedListItems = [...newListItems];

    if (direction === 'left' && itemIndex > 0) {
      const [movedItem] = updatedListItems.splice(itemIndex, 1);
      updatedListItems.splice(itemIndex - 1, 0, movedItem);
    } else if (direction === 'right' && itemIndex < updatedListItems.length - 1) {
      const [movedItem] = updatedListItems.splice(itemIndex, 1);
      updatedListItems.splice(itemIndex + 1, 0, movedItem);
    }

    setNewListItems(updatedListItems);
    onMoveItem(updatedListItems);
  };

  return (
    <div className="list-creation-view">
      <div className="new-list-container">
        {newListItems.map((item, index) => (
          <div key={index} className="selected-list">
            {item}
            <button onClick={() => handleMoveItem(index, 'left')}>&lt;</button>
            <button onClick={() => handleMoveItem(index, 'right')}>&gt;</button>
          </div>
        ))}
      </div>
      <div className="action-buttons">
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onUpdate}>Update</button>
      </div>
    </div>
  );
};

export default ListCreationView;
