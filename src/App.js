import React, { useState, useEffect } from 'react';
import ListContainer from './ListContainer';
import ListCreationView from './ListCreateView';
import FailureView from './FailureView';
import './App.css';

const App = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLists, setSelectedLists] = useState([]);
  const [creatingList, setCreatingList] = useState(false);
  const [newListItems, setNewListItems] = useState([]);
  const fetchLists = async () => {
    try {
      const response = await fetch('https://apis.ccbp.in/list-creation/lists');
      const data = await response.json();
      setLists(data.lists);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  console.log(lists);

  useEffect(() => {
    fetchLists();
  }, []);

  const handleListSelection = (listId) => {
    setSelectedLists((prevSelectedLists) => {
      if (prevSelectedLists.includes(listId)) {
        return prevSelectedLists.filter((id) => id !== listId);
      } else {
        return [...prevSelectedLists, listId];
      }
    });
  };

  const handleCreateList = () => {
    setCreatingList(true);
    setNewListItems([]);
  };

  const handleCancelListCreation = () => {
    setCreatingList(false);
    setNewListItems([]);
  };

  const handleUpdateList = () => {
    setCreatingList(false);
  };

  const handleMoveItem = (updatedListItems) => {
    setNewListItems(updatedListItems);
  };

  return (
    <div className="app">
      {loading && <div className="loader">Loading...</div>}
      {error && <FailureView onTryAgain={() => fetchLists()} />}
      {!loading && !error && !creatingList && (
        <ListContainer
          lists={lists}
          selectedLists={selectedLists}
          onListSelection={handleListSelection}
          onCreateList={handleCreateList}
        />
      )}
      {!loading && !error && creatingList && (
        <ListCreationView
          selectedLists={selectedLists}
          onCancel={handleCancelListCreation}
          onUpdate={handleUpdateList}
          onMoveItem={handleMoveItem}
        />
      )}
    </div>
  );
};

export default App;
