import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists, createList, updateList, deleteList } from '../../slices/listsSlice';
import AddButton from '../ButtonComponent/Button';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import Loader from '../Loader/Loader';
import SearchAppBar from '../SearchBar/SearchBar';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Select, MenuItem } from '@mui/material';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import './Main.css';

// eslint-disable-next-line react/prop-types
const MainComponent = ({ initialCategory }) => { // Renamed prop
  const dispatch = useDispatch();
  const { lists = [], status, error } = useSelector((state) => state.lists);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredListsState, setFilteredListsState] = useState([]);
  const [editingList, setEditingList] = useState(null);
  const [listName, setListName] = useState('');
  const [listItems, setListItems] = useState([]);
  const [selectedListToShare, setSelectedListToShare] = useState(null);
  const [shareableLink, setShareableLink] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || ''); // Use prop value if available

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
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:5000/categories`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Ensure data is in the expected format
        if (Array.isArray(data) && typeof data[0] === 'string') {
          setCategories(data);
        } else {
          console.error('Unexpected format for categories:', data);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddListSubmit = async () => {
    const newList = { name: listName, items: listItems, category: selectedCategory };
    try {
      if (editingList) {
        await dispatch(updateList({ ...editingList, name: listName, items: listItems, category: selectedCategory }));
        setNotificationMessage('List updated successfully!');
      } else {
        await dispatch(createList(newList));
        setNotificationMessage('List added successfully!');
      }
      dispatch(fetchLists());
      handleClosePopup();
    } catch (error) {
      setNotificationMessage('Error occurred: ' + error.message);
    }
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      window.location.href = '/';
    }, 2000);
  };

  const handleDeleteList = async (id) => {
    try {
      await dispatch(deleteList(id));
      setNotificationMessage('List deleted successfully!');
      dispatch(fetchLists());
    } catch (error) {
      setNotificationMessage('Error occurred: ' + error.message);
    }
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      window.location.href = '/';
    }, 2000);
  };

  const handleAddList = () => {
    setEditingList(null);
    setListName('');
    setListItems([]);
    setSelectedCategory('');
    setShowAddPopup(true);
  };

  const handleEditList = (list) => {
    setEditingList(list);
    setListName(list.name);
    setListItems(list.items);
    setSelectedCategory(list.category || '');
    setShowEditPopup(true);
  };

  const handleShareList = (list) => {
    setSelectedListToShare(list);
    const link = `http://localhost:5000/lists/${list.id}`;
    setShareableLink(link);
    setShowSharePopup(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink)
      .then(() => alert('Link copied to clipboard!'))
      .catch(err => console.error('Failed to copy link:', err));
  };

  const handleClosePopup = () => {
    setShowAddPopup(false);
    setShowEditPopup(false);
    setShowSharePopup(false);
    setShowNotification(false);
  };

  return (
    <div className="Wrapper">
      {isLoading && <Loader />}

      <div className="left">
        <AddButton label="Add New List" onAdd={handleAddList} className='floatingBtn' />
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
                  <div className="crudBtns">
                    <Button variant="contained" onClick={() => handleEditList(list)} style={{ background: '#000'}}><EditNoteIcon/></Button>
                    <Button variant="contained" onClick={() => handleShareList(list)} style={{ background: '#000' }}><ShareOutlinedIcon/></Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this list?')) {
                          handleDeleteList(list.id);
                        }
                      }}
                      style={{ background: '#000' }}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <p>No lists available</p>
          )}
        </div>
      </div>

      {/* Notification Popup */}
      {showNotification && (
        <Dialog open={showNotification} onClose={() => setShowNotification(false)}>
          <DialogTitle>Notification</DialogTitle>
          <DialogContent>
            <Typography variant="body1">{notificationMessage}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowNotification(false)} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}

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
          <Select
            margin="dense"
            fullWidth
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Select Category' }}
          >
            <MenuItem value="" disabled>Select Category</MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
          <TextField
            margin="dense"
            label="Items (comma separated)"
            type="text"
            fullWidth
            value={listItems.join(', ')}
            onChange={(e) => setListItems(e.target.value.split(',').map(item => item.trim()))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">Cancel</Button>
          <Button onClick={handleAddListSubmit} color="primary">Save</Button>
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
          <Select
            margin="dense"
            fullWidth
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Select Category' }}
          >
            <MenuItem value="" disabled>Select Category</MenuItem>
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
          <TextField
            margin="dense"
            label="Items (comma separated)"
            type="text"
            fullWidth
            value={listItems.join(', ')}
            onChange={(e) => setListItems(e.target.value.split(',').map(item => item.trim()))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">Cancel</Button>
          <Button onClick={handleAddListSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Share List Popup */}
      <Dialog open={showSharePopup} onClose={handleClosePopup}>
        <DialogTitle>Share List</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Shareable Link:</Typography>
          <TextField
            margin="dense"
            fullWidth
            value={shareableLink}
            InputProps={{
              readOnly: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCopyLink} color="primary">Copy Link</Button>
          <Button onClick={handleClosePopup} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MainComponent;
