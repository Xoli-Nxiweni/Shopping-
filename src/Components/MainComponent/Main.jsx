import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists, createList, updateList, deleteList } from '../../slices/listsSlice';
import AddButton from '../ButtonComponent/Button';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import Loader from '../Loader/Loader';
import SearchAppBar from '../SearchBar/SearchBar';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import './Main.css';

const MainComponent = ({ selectedCategory }) => {
  const dispatch = useDispatch();
  const { lists = [], status, error } = useSelector((state) => state.lists);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredListsState, setFilteredListsState] = useState([]);
  const [editingList, setEditingList] = useState(null);
  const [listName, setListName] = useState('');
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLists());
    }
  }, [status, dispatch]);

  useEffect(() => {
    let filtered = lists;

    if (selectedCategory) {
      filtered = filtered.filter(list =>
        list.name?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        list.items?.some(item =>
          item.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(list =>
        list.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        list.items?.some(item =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredListsState(filtered);
  }, [searchTerm, lists, selectedCategory]);

  useEffect(() => {
    // Load lists from localStorage if not available in state
    const storedLists = JSON.parse(localStorage.getItem('lists')) || [];
    if (lists.length === 0) {
      dispatch(fetchLists()).catch(() => {
        // If fetch fails, fall back to localStorage data
        dispatch({ type: 'lists/fetchLists/fulfilled', payload: storedLists });
      });
    }
  }, [lists, dispatch]);

  const handleAddList = () => {
    console.log('clicked');
    setEditingList(null);
    setListName('');
    setListItems([]);
    setShowAddPopup(true);
    setShowAddPopup(true);
    
  };

  const handleEditList = (list) => {
    setEditingList(list);
    setListName(list.name || '');
    setListItems(list.items || []);
    setShowEditPopup(true);
  };

  const handleClosePopup = () => {
    setShowAddPopup(false);
    setShowEditPopup(false);
  };

  const handleAddListSubmit = async () => {
    const newList = { name: listName, items: listItems };
    try {
      if (editingList) {
        await dispatch(updateList({ ...editingList, name: listName, items: listItems }));
      } else {
        await dispatch(createList(newList));
      }
      // Update localStorage
      localStorage.setItem('lists', JSON.stringify([...lists, newList]));
      handleClosePopup();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleDeleteList = (id) => {
    dispatch(deleteList(id))
      .then(() => {
        // Update localStorage after successful delete
        const updatedLists = lists.filter(list => list.id !== id);
        localStorage.setItem('lists', JSON.stringify(updatedLists));
      });
  };

  return (
    <div className="Wrapper">
      {isLoading && <Loader />}

      <div className="left">
        <AddButton label="Add New List" onClick={handleAddList} />
        <div className="searchContainer">
          <SearchAppBar onSearchChange={setSearchTerm} />
        </div>
        <div className="Container">
          {status === 'failed' && <p>Error: {error}</p>}
          {filteredListsState.length > 0 ? (
            <ul className="unorderedList">
              {filteredListsState.map((list) => (
                <div key={list.id} className={list.items && list.items.length > 0 ? 'containerList' : 'containerList2'}>
                  <div className="tag">
                    <SellOutlinedIcon className='searchIcon'/>
                  </div>
                  <Typography variant="h6" component="span" style={{ fontWeight: 600 }}>{list.name}</Typography>
                  <ul className="ListWrapper">
                    {list.items && list.items.length > 0 ? (
                      list.items.map((item, index) => (
                        <li key={index} className="listItem" style={{ borderBottom: '1px solid #a6a6a6' }}>
                          {item}
                        </li>
                      ))
                    ) : (
                      <li>No items available</li>
                    )}
                  </ul>
                  <Button variant="contained" color="primary" onClick={() => handleEditList(list)} style={{ margin: '10px' }}>Edit</Button>
                  <Button variant="contained" color="warning" onClick={() => handleDeleteList(list.id)} style={{ margin: '10px' }}>Delete</Button>
                </div>
              ))}
            </ul>
          ) : (
            <p>No lists available</p>
          )}
        </div>
      </div>

      {/* Add List Popup */}
      <Dialog open={showAddPopup} onClose={handleClosePopup}>
        <DialogTitle>Add New List</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="List Name"
            type="text"
            fullWidth
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          {listItems.map((item, index) => (
            <TextField
              key={index}
              margin="dense"
              label={`Item ${index + 1}`}
              type="text"
              fullWidth
              value={item}
              onChange={(e) => {
                const newItems = [...listItems];
                newItems[index] = e.target.value;
                setListItems(newItems);
              }}
              style={{ marginBottom: 8 }}
            />
          ))}
          <Button onClick={() => setListItems([...listItems, ''])}>Add Item</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">Cancel</Button>
          <Button onClick={handleAddListSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Edit List Popup */}
      <Dialog open={showEditPopup} onClose={handleClosePopup}>
        <DialogTitle>Edit List</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="List Name"
            type="text"
            fullWidth
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          {listItems.map((item, index) => (
            <TextField
              key={index}
              margin="dense"
              label={`Item ${index + 1}`}
              type="text"
              fullWidth
              value={item}
              onChange={(e) => {
                const newItems = [...listItems];
                newItems[index] = e.target.value;
                setListItems(newItems);
              }}
              style={{ marginBottom: 8 }}
            />
          ))}
          <Button onClick={() => setListItems([...listItems, ''])}>Add Item</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">Cancel</Button>
          <Button onClick={handleAddListSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MainComponent;
