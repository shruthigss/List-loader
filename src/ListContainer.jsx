import React from "react";

const ListContainer = ({
  lists,
  selectedLists,
  onListSelection,
  onCreateList,
}) => {
  return (
    <div className="container">
      <div className="list-container">
        {lists.map((list) => (
          <div
            key={list.id}
            className={`list-item ${
              selectedLists.includes(list.id) ? "selected" : ""
            }`}
            onClick={() => onListSelection(list.id)}
          >
            {list.name}
            {list.description}
          </div>
        ))}
        <button className="create-list-btn" onClick={onCreateList}>
          Create a new list
        </button>
      </div>
    </div>
  );
};

export default ListContainer;
