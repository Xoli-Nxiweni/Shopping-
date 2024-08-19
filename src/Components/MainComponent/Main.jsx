import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists } from '../../slices/listsSlice';
import AddButton from '../ButtonComponent/Button';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import Loader from '../Loader/Loader';
import AddListPopup from '../AddListPopUp/AddListPopUp';
import SearchAppBar from '../SearchBar/SearchBar'; 
import './Main.css';

const MainComponent = () => {
  const dispatch = useDispatch();
  const { lists = [], status, error } = useSelector((state) => state.lists);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLists, setFilteredLists] = useState([]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLists());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = lists.filter(list =>
        list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        list.items.some(item =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredLists(filtered);
    } else {
      setFilteredLists(lists);
    }
  }, [searchTerm, lists]);

  const handleAddList = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
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
          {filteredLists.length > 0 ? (
            <ul className="unorderedList">
              {filteredLists.map((list) => (
                <div key={list.id} className={list.items && list.items.length > 0 ? 'containerList' : 'containerList2'}>
                  <div className="tag">
                    <SellOutlinedIcon className='searchIcon'/>
                  </div>
                  <span style={{ fontWeight: 600 }}>{list.name}</span>
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
                </div>
              ))}
            </ul>
          ) : (
            <p>No lists available</p>
          )}
        </div>
      </div>

      <div className="right">
        <div className="shareContainer">
          <div className="textWrap">
            <div className="image">
              <img
                src="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-980x653.jpg"
                alt="image"
                style={{ height: '100px', objectFit: 'contain' }}
              />
            </div>
            <div className="text">
              <p>SHARE YOUR LIST</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil mollitia saepe dolor ex velit amet
                necessitatibus totam architecto unde laboriosam!
              </p>
              <button>SHARE INVITE LINK</button>
            </div>
          </div>
        </div>
      </div>

      {showPopup && <AddListPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default MainComponent;
