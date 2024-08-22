// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchLists, createList, updateList, deleteList } from '../../slices/listsSlice'; // Added actions
// import AddButton from '../ButtonComponent/Button';
// import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
// import Loader from '../Loader/Loader';
// import AddListPopup from '../AddListPopUp/AddListPopUp';
// import SearchAppBar from '../SearchBar/SearchBar'; 
// import './Main.css';

// const MainComponent = () => {
//   const dispatch = useDispatch();
//   const { lists = [], status, error } = useSelector((state) => state.lists);
//   const isLoading = useSelector((state) => state.loading.isLoading);
//   const [showPopup, setShowPopup] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredLists, setFilteredLists] = useState([]);
//   const [editingList, setEditingList] = useState(null); // For editing list

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchLists());
//     }
//   }, [status, dispatch]);

//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = lists.filter(list =>
//         list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         list.items.some(item =>
//           item.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//       setFilteredLists(filtered);
//     } else {
//       setFilteredLists(lists);
//     }
//   }, [searchTerm, lists]);

//   const handleAddList = () => {
//     setEditingList(null); // Clear editing state
//     setShowPopup(true);
//   };

//   const handleEditList = (list) => {
//     setEditingList(list);
//     setShowPopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   const handleAddListSubmit = (list) => {
//     if (editingList) {
//       dispatch(updateList(list)); // Update existing list
//     } else {
//       dispatch(createList(list)); // Add new list
//     }
//     handleClosePopup();
//   };

//   const handleDeleteList = (id) => {
//     dispatch(deleteList(id)); // Delete list
//   };

//   // Add console logs for debugging
//   // console.log('Lists:', lists);
//   // console.log('Status:', status);
//   // console.log('Error:', error);

//   return (
//     <div className="Wrapper">
//       {isLoading && <Loader />}

//       <div className="left">
//         <AddButton label="Add New List" onClick={handleAddList} />
//         <div className="searchContainer">
//           <SearchAppBar onSearchChange={setSearchTerm} />
//         </div>
//         <div className="Container">
//           {status === 'failed' && <p>Error: {error}</p>}
//           {filteredLists.length > 0 ? (
//             <ul className="unorderedList">
//               {filteredLists.map((list) => (
//                 <div key={list.id} className={list.items && list.items.length > 0 ? 'containerList' : 'containerList2'}>
//                   <div className="tag">
//                     <SellOutlinedIcon className='searchIcon'/>
//                   </div>
//                   <span style={{ fontWeight: 600 }}>{list.name}</span>
//                   <ul className="ListWrapper">
//                     {list.items && list.items.length > 0 ? (
//                       list.items.map((item, index) => (
//                         <li key={index} className="listItem" style={{ borderBottom: '1px solid #a6a6a6' }}>
//                           {item}
//                         </li>
//                       ))
//                     ) : (
//                       <li>No items available</li>
//                     )}
//                   </ul>
//                   <button style={{
//                     background:'#0a0a0a',
//                     margin: '10px 10px 10px 0'
//                   }} onClick={() => handleEditList(list.id)}>Edit</button>
//                   <button style={{
//                     background:'#0a0a0a',
//                     margin: '10px 10px 10px 0'
//                   }} onClick={() => handleDeleteList(list.id)}>Delete</button>
//                 </div>
//               ))}
//             </ul>
//           ) : (
//             <p>No lists available</p>
//           )}
//         </div>
//       </div>

//       {/* <div className="right">
//         <div className="shareContainer">
//           <div className="textWrap">
//             <div className="image">
//               <img
//                 src="https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-980x653.jpg"
//                 alt="image"
//                 style={{ height: '100px', objectFit: 'contain' }}
//               />
//             </div>
//           </div>
//         </div>
//       </div> */}

//       {showPopup && (
//         <div className="popup-overlay">
//           <div className="popup-content">
//             <button className="close-btn" onClick={handleClosePopup}>X</button>
//             <AddListPopup onClose={handleClosePopup} onSubmit={handleAddListSubmit} list={editingList} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MainComponent;

// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchLists, createList, updateList, deleteList } from '../../slices/listsSlice';
// import AddButton from '../ButtonComponent/Button';
// import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
// import Loader from '../Loader/Loader';
// import AddListPopup from '../AddListPopUp/AddListPopUp';
// import SearchAppBar from '../SearchBar/SearchBar'; 
// import './Main.css';

// const MainComponent = () => {
//   const dispatch = useDispatch();
//   const { lists = [], status, error } = useSelector((state) => state.lists);
//   const isLoading = useSelector((state) => state.loading.isLoading);
//   const [showPopup, setShowPopup] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredLists, setFilteredLists] = useState([]);
//   const [editingList, setEditingList] = useState(null); // For editing list

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchLists());
//     }
//   }, [status, dispatch]);

//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = lists.filter(list =>
//         list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         list.items.some(item =>
//           item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.quantity.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//       setFilteredLists(filtered);
//     } else {
//       setFilteredLists(lists);
//     }
//   }, [searchTerm, lists]);

//   const handleAddList = () => {
//     setEditingList(null); // Clear editing state
//     setShowPopup(true);
//   };

//   const handleEditList = (list) => {
//     setEditingList(list);
//     setShowPopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   const handleAddListSubmit = (list) => {
//     if (editingList) {
//       dispatch(updateList(list)); // Update existing list
//     } else {
//       dispatch(createList(list)); // Add new list
//     }
//     handleClosePopup();
//   };

//   const handleDeleteList = (id) => {
//     dispatch(deleteList(id)); // Delete list
//   };

//   // Add console logs for debugging
//   console.log('Lists:', lists);
//   console.log('Status:', status);
//   console.log('Error:', error);

//   return (
//     <div className="Wrapper">
//       {isLoading && <Loader />}

//       <div className="left">
//         <AddButton label="Add New List" onClick={handleAddList} />
//         <div className="searchContainer">
//           <SearchAppBar onSearchChange={setSearchTerm} />
//         </div>
//         <div className="Container">
//           {status === 'failed' && <p>Error: {error}</p>}
//           {filteredLists.length > 0 ? (
//             <ul className="unorderedList">
//               {filteredLists.map((list) => (
//                 <div key={list.id} className={list.items && list.items.length > 0 ? 'containerList' : 'containerList2'}>
//                   <div className="tag">
//                     <SellOutlinedIcon className='searchIcon'/>
//                   </div>
//                   <span style={{ fontWeight: 600 }}>{list.name}</span>
//                   <ul className="ListWrapper">
//                     {list.items && list.items.length > 0 ? (
//                       list.items.map((item, index, quantity , m) => (
//                         <>
//                         <li key={index.id} className="listItem" style={{ borderBottom: '1px solid #a6a6a6' }}>
//                           {item}
//                         </li>
//                         {/* <li key={index} className="listItem" style={{ borderBottom: '1px solid #a6a6a6' }}>{item}</li> */}
//                         </>
//                       ))
//                     ) : (
//                       <li>No items available</li>
//                     )}
//                   </ul>
//                   <button style={{
//                     background:'#0a0a0a',
//                     margin: '10px 10px 10px 0'
//                   }} onClick={() => handleEditList(list.id)}>Edit</button>
//                   <button style={{
//                     background:'#0a0a0a',
//                     margin: '10px 10px 10px 0'
//                   }} onClick={() => handleDeleteList(list.id)}>Delete</button>
//                 </div>
//               ))}
//             </ul>
//           ) : (
//             <p>No lists available</p>
//           )}
//         </div>
//       </div>

//       {showPopup && (
//         <div className="popup-overlay">
//           <div className="popup-content">
//             <button className="close-btn" onClick={handleClosePopup}>X</button>
//             <AddListPopup onClose={handleClosePopup} onSubmit={handleAddListSubmit} list={editingList} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MainComponent;

// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchLists, createList, updateList, deleteList } from '../../slices/listsSlice';
// import AddButton from '../ButtonComponent/Button';
// import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
// import Loader from '../Loader/Loader';
// import AddListPopup from '../AddListPopUp/AddListPopUp';
// import SearchAppBar from '../SearchBar/SearchBar';
// import './Main.css';

// const MainComponent = () => {
//   const dispatch = useDispatch();
//   const { lists = [], status, error } = useSelector((state) => state.lists);
//   const isLoading = useSelector((state) => state.loading.isLoading);
//   const [showPopup, setShowPopup] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredLists, setFilteredLists] = useState([]);
//   const [editingList, setEditingList] = useState(null); // For editing list

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchLists());
//     }
//   }, [status, dispatch]);

//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = lists.filter(list =>
//         list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         list.items.some(item =>
//           item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.quantity.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//       setFilteredLists(filtered);
//     } else {
//       setFilteredLists(lists);
//     }
//   }, [searchTerm, lists]);

//   const handleAddList = () => {
//     setEditingList(null); // Clear editing state
//     setShowPopup(true);
//   };

//   const handleEditList = (list) => {
//     setEditingList(list);
//     setShowPopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   const handleAddListSubmit = (list) => {
//     if (editingList) {
//       dispatch(updateList(list)); // Update existing list
//     } else {
//       dispatch(createList(list)); // Add new list
//     }
//     handleClosePopup();
//   };

//   const handleDeleteList = (id) => {
//     dispatch(deleteList(id)); // Delete list
//   };

//   // Add console logs for debugging
//   console.log('Lists:', lists);
//   console.log('Status:', status);
//   console.log('Error:', error);

//   return (
//     <div className="Wrapper">
//       {isLoading && <Loader />}

//       <div className="left">
//         <AddButton label="Add New List" onClick={handleAddList} />
//         <div className="searchContainer">
//           <SearchAppBar onSearchChange={setSearchTerm} />
//         </div>
//         <div className="Container">
//           {status === 'failed' && <p>Error: {error}</p>}
//           {filteredLists.length > 0 ? (
//             <ul className="unorderedList">
//               {filteredLists.map((list) => (
//                 <div key={list.id} className={list.items && list.items.length > 0 ? 'containerList' : 'containerList2'}>
//                   <div className="tag">
//                     <SellOutlinedIcon className='searchIcon'/>
//                   </div>
//                   <span style={{ fontWeight: 600 }}>{list.name}</span>
//                   <ul className="ListWrapper">
//                     {list.items && list.items.length > 0 ? (
//                       list.items.map((item, index) => (
//                         <li key={index} className="listItem" style={{ borderBottom: '1px solid #a6a6a6' }}>
//                           {item} 
//                         </li>
//                       ))
//                     ) : (
//                       <li>No items available</li>
//                     )}
//                   </ul>
//                   <button style={{
//                     background:'#0a0a0a',
//                     margin: '10px 10px 10px 0'
//                   }} onClick={() => handleEditList(list)}>Edit</button>
//                   <button style={{
//                     background:'#0a0a0a',
//                     margin: '10px 10px 10px 0'
//                   }} onClick={() => handleDeleteList(list.id)}>Delete</button>
//                 </div>
//               ))}
//             </ul>
//           ) : (
//             <p>No lists available</p>
//           )}
//         </div>
//       </div>

//       {showPopup && (
//         <div className="popup-overlay">
//           <div className="popup-content">
//             <button className="close-btn" onClick={handleClosePopup}>X</button>
//             <AddListPopup onClose={handleClosePopup} onSubmit={handleAddListSubmit} list={editingList} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MainComponent;


// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchLists, createList, updateList, deleteList } from '../../slices/listsSlice';
// import AddButton from '../ButtonComponent/Button';
// import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
// import Loader from '../Loader/Loader';
// import AddListPopup from '../AddListPopUp/AddListPopUp';
// import SearchAppBar from '../SearchBar/SearchBar';
// import EditList from '../EditLists/EditList';
// import './Main.css';

// const MainComponent = () => {
//   const dispatch = useDispatch();
//   const { lists = [], status, error } = useSelector((state) => state.lists);
//   const isLoading = useSelector((state) => state.loading.isLoading);
//   const [showAddPopup, setShowAddPopup] = useState(false);
//   const [showEditPopup, setShowEditPopup] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredLists, setFilteredLists] = useState([]);
//   const [editingList, setEditingList] = useState(null); // For editing list

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchLists());
//     }
//   }, [status, dispatch]);

//   // useEffect(() => {
//   //   if (searchTerm) {
//   //     const filtered = lists.filter(list =>
//   //       list.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   //       list.items.some(item =>
//   //         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   //         item.quantity.toLowerCase().includes(searchTerm.toLowerCase())
//   //       )
//   //     );
//   //     setFilteredLists(filtered);
//   //   } else {
//   //     setFilteredLists(lists);
//   //   }
//   // }, [searchTerm, lists]);

//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = lists.filter(list =>
//         list.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         list.items?.some(item =>
//           item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.quantity?.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//       setFilteredLists(filtered);
//     } else {
//       setFilteredLists(lists);
//     }
//   }, [searchTerm, lists]);
  

//   const handleAddList = () => {
//     setEditingList(null); // Clear editing state
//     setShowPopup(true);
//   };

//   const handleEditList = (list) => {
//     setEditingList(list);
//     setShowPopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   const handleAddListSubmit = (list) => {
//     if (editingList) {
//       dispatch(updateList(list)); // Update existing list
//     } else {
//       dispatch(createList(list)); // Add new list
//     }
//     handleClosePopup();
//   };

//   const handleDeleteList = (id) => {
//     dispatch(deleteList(id)); // Delete list
//   };

//   // Add console logs for debugging
//   console.log('Lists:', lists);
//   console.log('Status:', status);
//   console.log('Error:', error);

//   return (
//     <div className="Wrapper">
//       {isLoading && <Loader />}

//       <div className="left">
//         <AddButton label="Add New List" onClick={handleAddList} />
//         <div className="searchContainer">
//           <SearchAppBar onSearchChange={setSearchTerm} />
//         </div>
//         <div className="Container">
//           {status === 'failed' && <p>Error: {error}</p>}
//           {filteredLists.length > 0 ? (
//             <ul className="unorderedList">
//               {filteredLists.map((list) => (
//                 <div key={list.id} className={list.items && list.items.length > 0 ? 'containerList' : 'containerList2'}>
//                   <div className="tag">
//                     <SellOutlinedIcon className='searchIcon'/>
//                   </div>
//                   <span style={{ fontWeight: 600 }}>{list.name}</span>
//                   <ul className="ListWrapper">
//                     {list.items && list.items.length > 0 ? (
//                       list.items.map((item, index) => (
//                         <li key={index} className="listItem" style={{ borderBottom: '1px solid #a6a6a6' }}>
//                           {item}
//                         </li>
//                       ))
//                     ) : (
//                       <li>No items available</li>
//                     )}
//                   </ul>
//                   <button style={{
//                     background:'#0a0a0a',
//                     margin: '10px 10px 10px 0'
//                   }} onClick={() => handleEditList(list)}>Edit</button>
//                   <button style={{
//                     background:'#0a0a0a',
//                     margin: '10px 10px 10px 0'
//                   }} onClick={() => handleDeleteList(list.id)}>Delete</button>
//                 </div>
//               ))}
//             </ul>
//           ) : (
//             <p>No lists available</p>
//           )}
//         </div>
//       </div>

//       {showEditPopup && (
//         <div className="popup-overlay">
//           <div className="popup-content">
//             <button className="close-btn" onClick={handleClosePopup}>X</button>
//             <AddListPopup onClose={handleClosePopup} onSubmit={handleAddListSubmit} list={editingList} />
//           </div>
//         </div>
//       )}
//       {showAddPopup && (
//         <div className="popup-overlay">
//           <div className="popup-content">
//             <button className="close-btn" onClick={handleClosePopup}>X</button>
//             <AddListPopup onClose={handleClosePopup} onSubmit={handleAddListSubmit} list={editingList} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MainComponent;

// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchLists, createList, updateList, deleteList } from '../../slices/listsSlice';
// import AddButton from '../ButtonComponent/Button';
// import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
// import Loader from '../Loader/Loader';
// import AddListPopup from '../AddListPopUp/AddListPopUp';
// import EditListPopup from '../EditLists/EditList' // Import the EditListPopup component
// import SearchAppBar from '../SearchBar/SearchBar';
// import './Main.css';

// const MainComponent = () => {
//   const dispatch = useDispatch();
//   const { lists = [], status, error } = useSelector((state) => state.lists);
//   const isLoading = useSelector((state) => state.loading.isLoading);
//   const [showAddPopup, setShowAddPopup] = useState(false);
//   const [showEditPopup, setShowEditPopup] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredLists, setFilteredLists] = useState([]);
//   const [editingList, setEditingList] = useState(null); // For editing list

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchLists());
//     }
//   }, [status, dispatch]);

//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = lists.filter(list =>
//         list.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         list.items?.some(item =>
//           item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.quantity?.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//       setFilteredLists(filtered);
//     } else {
//       setFilteredLists(lists);
//     }
//   }, [searchTerm, lists]);

//   const handleAddList = () => {
//     setEditingList(null); // Clear editing state
//     setShowAddPopup(true);
//   };

//   const handleEditList = (list) => {
//     setEditingList(list);
//     setShowEditPopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowAddPopup(false);
//     setShowEditPopup(false);
//   };

//   const handleAddListSubmit = (list) => {
//     if (editingList) {
//       dispatch(updateList(list)); // Update existing list
//     } else {
//       dispatch(createList(list)); // Add new list
//     }
//     handleClosePopup();
//   };

//   const handleEditListSubmit = (updatedList) => {
//     dispatch(updateList(updatedList)); // Update existing list
//     handleClosePopup();
//   };

//   const handleDeleteList = (id) => {
//     dispatch(deleteList(id)); // Delete list
//   };

//   // Add console logs for debugging
//   console.log('Lists:', lists);
//   console.log('Status:', status);
//   console.log('Error:', error);

//   return (
//     <div className="Wrapper">
//       {isLoading && <Loader />}

//       <div className="left">
//         <AddButton label="Add New List" onClick={handleAddList} />
//         <div className="searchContainer">
//           <SearchAppBar onSearchChange={setSearchTerm} />
//         </div>
//         <div className="Container">
//           {status === 'failed' && <p>Error: {error}</p>}
//           {filteredLists.length > 0 ? (
//             <ul className="unorderedList">
//               {filteredLists.map((list) => (
//                 <div key={list.id} className={list.items && list.items.length > 0 ? 'containerList' : 'containerList2'}>
//                   <div className="tag">
//                     <SellOutlinedIcon className='searchIcon'/>
//                   </div>
//                   <span style={{ fontWeight: 600 }}>{list.name}</span>
//                   <ul className="ListWrapper">
//                     {list.items && list.items.length > 0 ? (
//                       list.items.map((item, index) => (
//                         <li key={index} className="listItem" style={{ borderBottom: '1px solid #a6a6a6' }}>
//                           {item}
//                         </li>
//                       ))
//                     ) : (
//                       <li>No items available</li>
//                     )}
//                   </ul>
//                   <button style={{
//                     background:'#0a0a0a',
//                     margin: '10px 10px 10px 0'
//                   }} onClick={() => handleEditList(list)}>Edit</button>
//                   <button style={{
//                     background:'#0a0a0a',
//                     margin: '10px 10px 10px 0'
//                   }} onClick={() => handleDeleteList(list.id)}>Delete</button>
//                 </div>
//               ))}
//             </ul>
//           ) : (
//             <p>No lists available</p>
//           )}
//         </div>
//       </div>

//       {showAddPopup && (
//         <div className="popup-overlay">
//           <div className="popup-content">
//             <button className="close-btn" onClick={handleClosePopup}>X</button>
//             <AddListPopup onClose={handleClosePopup} onSubmit={handleAddListSubmit} list={editingList} />
//           </div>
//         </div>
//       )}

//       {showEditPopup && (
//         <div className="popup-overlay">
//           <div className="popup-content">
//             <button className="close-btn" onClick={handleClosePopup}>X</button>
//             <EditListPopup onClose={handleClosePopup} onSubmit={handleEditListSubmit} list={editingList} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MainComponent;


// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchLists, createList, updateList, deleteList } from '../../slices/listsSlice';
// import AddButton from '../ButtonComponent/Button';
// import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
// import Loader from '../Loader/Loader';
// import AddListPopup from '../AddListPopUp/AddListPopUp';
// import EditListPopup from '../EditLists/EditList'; // Import the EditListPopup component
// import SearchAppBar from '../SearchBar/SearchBar';
// import './Main.css';

// const MainComponent = () => {
//   const dispatch = useDispatch();
//   const { lists = [], status, error } = useSelector((state) => state.lists);
//   const isLoading = useSelector((state) => state.loading.isLoading);
//   const [showAddPopup, setShowAddPopup] = useState(false);
//   const [showEditPopup, setShowEditPopup] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredLists, setFilteredLists] = useState([]);
//   const [editingList, setEditingList] = useState(null); // For editing list

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchLists());
//     }
//   }, [status, dispatch]);

//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = lists.filter(list =>
//         list.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         list.items?.some(item =>
//           item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.quantity?.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//       setFilteredLists(filtered);
//     } else {
//       setFilteredLists(lists);
//     }
//   }, [searchTerm, lists]);

//   const handleAddList = () => {
//     setEditingList(null); // Clear editing state
//     setShowAddPopup(true);
//   };

//   const handleEditList = (list) => {
//     setEditingList(list);
//     setShowEditPopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowAddPopup(false);
//     setShowEditPopup(false);
//   };

//   const handleAddListSubmit = (list) => {
//     if (editingList) {
//       dispatch(updateList(list)); // Update existing list
//     } else {
//       dispatch(createList(list)); // Add new list
//     }
//     handleClosePopup();
//   };

//   const handleEditListSubmit = (updatedList) => {
//     dispatch(updateList(updatedList)); // Update existing list
//     handleClosePopup();
//   };

//   const handleDeleteList = (id) => {
//     dispatch(deleteList(id)); // Delete list
//   };

//   // Add console logs for debugging
//   console.log('Lists:', lists);
//   console.log('Status:', status);
//   console.log('Error:', error);

//   return (
//     <div className="Wrapper">
//       {isLoading && <Loader />}

//       <div className="left">
//         <AddButton label="Add New List" onClick={handleAddList} />
//         <div className="searchContainer">
//           <SearchAppBar onSearchChange={setSearchTerm} />
//         </div>
//         <div className="Container">
//           {status === 'failed' && <p>Error: {error}</p>}
//           {filteredLists.length > 0 ? (
//             <ul className="unorderedList">
//               {filteredLists.map((list) => (
//                 <div key={list.id} className={list.items && list.items.length > 0 ? 'containerList' : 'containerList2'}>
//                   <div className="tag">
//                     <SellOutlinedIcon className='searchIcon'/>
//                   </div>
//                   <span style={{ fontWeight: 600 }}>{list.name}</span>
//                   <ul className="ListWrapper">
//                     {list.items && list.items.length > 0 ? (
//                       list.items.map((item, index) => (
//                         <li key={index} className="listItem" style={{ borderBottom: '1px solid #a6a6a6' }}>
//                           {item}
//                         </li>
//                       ))
//                     ) : (
//                       <li>No items available</li>
//                     )}
//                   </ul>
//                   <button style={{
//                     background:'#0a0a0a',
//                     margin: '10px 10px 10px 0'
//                   }} onClick={() => handleEditList(list)}>Edit</button>
//                   <button style={{
//                     background:'#0a0a0a',
//                     margin: '10px 10px 10px 0'
//                   }} onClick={() => handleDeleteList(list.id)}>Delete</button>
//                 </div>
//               ))}
//             </ul>
//           ) : (
//             <p>No lists available</p>
//           )}
//         </div>
//       </div>

//       {showAddPopup && (
//         <div className="popup-overlay">
//           <div className="popup-content">
//             <button className="close-btn" onClick={handleClosePopup}>X</button>
//             <AddListPopup onClose={handleClosePopup} onSubmit={handleAddListSubmit} list={editingList} />
//           </div>
//         </div>
//       )}

//       {showEditPopup && (
//         <div className="popup-overlay">
//           <div className="popup-content">
//             <button className="close-btn" onClick={handleClosePopup}>X</button>
//             <EditListPopup onClose={handleClosePopup} onSubmit={handleEditListSubmit} list={editingList} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MainComponent;

// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchLists, createList, updateList, deleteList } from '../../slices/listsSlice';
// import AddButton from '../ButtonComponent/Button';
// import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
// import Loader from '../Loader/Loader';
// import AddListPopup from '../AddListPopUp/AddListPopUp';
// import EditListPopup from '../EditLists/EditList'; // Import the EditListPopup component
// import SearchAppBar from '../SearchBar/SearchBar';
// import './Main.css';

// const MainComponent = () => {
//   const dispatch = useDispatch();
//   const { lists = [], status, error } = useSelector((state) => state.lists);
//   const isLoading = useSelector((state) => state.loading.isLoading);
//   const [showAddPopup, setShowAddPopup] = useState(false);
//   const [showEditPopup, setShowEditPopup] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredLists, setFilteredLists] = useState([]);
//   const [editingList, setEditingList] = useState(null); // For editing list

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchLists());
//     }
//   }, [status, dispatch]);

//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = lists.filter(list =>
//         list.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         list.items?.some(item =>
//           item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.quantity?.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//       setFilteredLists(filtered);
//     } else {
//       setFilteredLists(lists);
//     }
//   }, [searchTerm, lists]);

//   const handleAddList = () => {
//     setEditingList(null); // Clear editing state
//     setShowAddPopup(true);
//   };

//   const handleEditList = (list) => {
//     setEditingList(list);
//     setShowEditPopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowAddPopup(false);
//     setShowEditPopup(false);
//   };

//   const handleAddListSubmit = (list) => {
//     if (editingList) {
//       dispatch(updateList(list)); // Update existing list
//     } else {
//       dispatch(createList(list)); // Add new list
//     }
//     handleClosePopup();
//   };

//   const handleEditListSubmit = (updatedList) => {
//     dispatch(updateList(updatedList)); // Update existing list
//     handleClosePopup();
//   };

//   const handleDeleteList = (id) => {
//     dispatch(deleteList(id)); // Delete list
//   };

//   // Add console logs for debugging
//   console.log('Lists:', lists);
//   console.log('Status:', status);
//   console.log('Error:', error);

//   return (
//     <div className="Wrapper">
//       {isLoading && <Loader />}

//       <div className="left">
//         <AddButton label="Add New List" onClick={handleAddList} />
//         <div className="searchContainer">
//           <SearchAppBar onSearchChange={setSearchTerm} />
//         </div>
//         <div className="Container">
//           {status === 'failed' && <p>Error: {error}</p>}
//           {filteredLists.length > 0 ? (
//             <ul className="unorderedList">
//               {filteredLists.map((list) => (
//                 <div key={list.id} className={list.items && list.items.length > 0 ? 'containerList' : 'containerList2'}>
//                   <div className="tag">
//                     <SellOutlinedIcon className='searchIcon'/>
//                   </div>
//                   <span style={{ fontWeight: 600 }}>{list.name}</span>
//                   <ul className="ListWrapper">
//                     {list.items && list.items.length > 0 ? (
//                       list.items.map((item, index) => (
//                         <li key={index} className="listItem" style={{ borderBottom: '1px solid #a6a6a6' }}>
//                           {item}
//                         </li>
//                       ))
//                     ) : (
//                       <li>No items available</li>
//                     )}
//                   </ul>
//                   <button style={{
//                     background:'#0a0a0a',
//                     margin: '10px 10px 10px 0'
//                   }} onClick={() => handleEditList(list)}>Edit</button>
//                   <button style={{
//                     background:'#0a0a0a',
//                     margin: '10px 10px 10px 0'
//                   }} onClick={() => handleDeleteList(list.id)}>Delete</button>
//                 </div>
//               ))}
//             </ul>
//           ) : (
//             <p>No lists available</p>
//           )}
//         </div>
//       </div>

//       {showAddPopup && (
//         <div className="popup-overlay">
//           <div className="popup-content">
//             <button className="close-btn" onClick={handleClosePopup}>X</button>
//             <AddListPopup onClose={handleClosePopup} onSubmit={handleAddListSubmit} list={editingList} />
//           </div>
//         </div>
//       )}

//       {showEditPopup && (
//         <div className="popup-overlay">
//           <div className="popup-content">
//             <button className="close-btn" onClick={handleClosePopup}>X</button>
//             <EditListPopup onClose={handleClosePopup} onSubmit={handleEditListSubmit} list={editingList} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MainComponent;

// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchLists, createList, updateList, deleteList } from '../../slices/listsSlice';
// import AddButton from '../ButtonComponent/Button';
// import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
// import Loader from '../Loader/Loader';
// import AddListPopup from '../AddListPopUp/AddListPopUp';
// import EditListPopup from '../EditLists/EditList'; // Import the EditListPopup component
// import SearchAppBar from '../SearchBar/SearchBar';
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
// import './Main.css';

// const MainComponent = () => {
//   const dispatch = useDispatch();
//   const { lists = [], status, error } = useSelector((state) => state.lists);
//   const isLoading = useSelector((state) => state.loading.isLoading);
//   const [showAddPopup, setShowAddPopup] = useState(false);
//   const [showEditPopup, setShowEditPopup] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredLists, setFilteredLists] = useState([]);
//   const [editingList, setEditingList] = useState(null); // For editing list

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchLists());
//     }
//   }, [status, dispatch]);

//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = lists.filter(list =>
//         list.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         list.items?.some(item =>
//           item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           item.quantity?.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//       setFilteredLists(filtered);
//     } else {
//       setFilteredLists(lists);
//     }
//   }, [searchTerm, lists]);

//   const handleAddList = () => {
//     setEditingList(null); // Clear editing state
//     setShowAddPopup(true);
//   };

//   const handleEditList = (list) => {
//     setEditingList(list);
//     setShowEditPopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowAddPopup(false);
//     setShowEditPopup(false);
//   };

//   const handleAddListSubmit = (list) => {
//     if (editingList) {
//       dispatch(updateList(list)); // Update existing list
//     } else {
//       dispatch(createList(list)); // Add new list
//     }
//     handleClosePopup();
//   };

//   const handleEditListSubmit = (updatedList) => {
//     dispatch(updateList(updatedList)); // Update existing list
//     handleClosePopup();
//   };

//   const handleDeleteList = (id) => {
//     dispatch(deleteList(id)); // Delete list
//   };

//   // Add console logs for debugging
//   console.log('Lists:', lists);
//   console.log('Status:', status);
//   console.log('Error:', error);

//   return (
//     <div className="Wrapper">
//       {isLoading && <Loader />}

//       <div className="left">
//         <AddButton label="Add New List" onClick={handleAddList} />
//         <div className="searchContainer">
//           <SearchAppBar onSearchChange={setSearchTerm} />
//         </div>
//         <div className="Container">
//           {status === 'failed' && <p>Error: {error}</p>}
//           {filteredLists.length > 0 ? (
//             <ul className="unorderedList">
//               {filteredLists.map((list) => (
//                 <div key={list.id} className={list.items && list.items.length > 0 ? 'containerList' : 'containerList2'}>
//                   <div className="tag">
//                     <SellOutlinedIcon className='searchIcon'/>
//                   </div>
//                   <Typography variant="h6" component="span" style={{ fontWeight: 600 }}>{list.name}</Typography>
//                   <ul className="ListWrapper">
//                     {list.items && list.items.length > 0 ? (
//                       list.items.map((item, index) => (
//                         <li key={index} className="listItem" style={{ borderBottom: '1px solid #a6a6a6' }}>
//                           {item}
//                         </li>
//                       ))
//                     ) : (
//                       <li>No items available</li>
//                     )}
//                   </ul>
//                   <Button variant="contained" color="primary" onClick={() => handleEditList(list)} style={{ margin: '10px' }}>Edit</Button>
//                   <Button variant="contained" color="warning" onClick={() => handleDeleteList(list.id)} style={{ margin: '10px' }}>Delete</Button>
//                 </div>
//               ))}
//             </ul>
//           ) : (
//             <p>No lists available</p>
//           )}
//         </div>
//       </div>

//       {/* Add List Popup */}
//       <Dialog open={showAddPopup} onClose={handleClosePopup}>
//         <DialogTitle>Add New List</DialogTitle>
//         <DialogContent>
//           <AddListPopup onClose={handleClosePopup} onSubmit={handleAddListSubmit} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClosePopup} color="primary">Cancel</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Edit List Popup */}
//       <Dialog open={showEditPopup} onClose={handleClosePopup}>
//         <DialogTitle>Edit List</DialogTitle>
//         <DialogContent>
//           <EditListPopup onClose={handleClosePopup} onSubmit={handleEditListSubmit} list={editingList} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClosePopup} color="primary">Cancel</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default MainComponent;

// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchLists, createList, updateList, deleteList } from '../../slices/listsSlice';
// import AddButton from '../ButtonComponent/Button';
// import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
// import Loader from '../Loader/Loader';
// import SearchAppBar from '../SearchBar/SearchBar';
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
// import './Main.css';

// const MainComponent = () => {
//   const dispatch = useDispatch();
//   const { lists = [], status, error } = useSelector((state) => state.lists);
//   const isLoading = useSelector((state) => state.loading.isLoading);
//   const [showAddPopup, setShowAddPopup] = useState(false);
//   const [showEditPopup, setShowEditPopup] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredLists, setFilteredLists] = useState([]);
//   const [editingList, setEditingList] = useState(null); // For editing list
//   const [listName, setListName] = useState('');
//   const [listItems, setListItems] = useState([]);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchLists());
//     }
//   }, [status, dispatch]);

//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = lists.filter(list =>
//         list.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         list.items?.some(item =>
//           item.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//       setFilteredLists(filtered);
//     } else {
//       setFilteredLists(lists);
//     }
//   }, [searchTerm, lists]);

//   const handleAddList = () => {
//     setEditingList(null);
//     setListName('');
//     setListItems([]);
//     setShowAddPopup(true);
//   };

//   const handleEditList = (list) => {
//     setEditingList(list);
//     setListName(list.name || '');
//     setListItems(list.items || []);
//     setShowEditPopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowAddPopup(false);
//     setShowEditPopup(false);
//   };

//   const handleAddListSubmit = async () => {
//     const newList = { name: listName, items: listItems };
//     try {
//       if (editingList) {
//         console.log('Updating list:', { ...editingList, name: listName, items: listItems });
//         await dispatch(updateList({ ...editingList, name: listName, items: listItems }));
//       } else {
//         console.log('Creating new list:', newList);
//         await dispatch(createList(newList));
//       }
//       handleClosePopup();
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   };
  

//   const handleDeleteList = (id) => {
//     dispatch(deleteList(id));
//   };

//   // Add console logs for debugging
//   // console.log('Lists:', lists);
//   // console.log('Status:', status);
//   // console.log('Error:', error);

//   return (
//     <div className="Wrapper">
//       {isLoading && <Loader />}

//       <div className="left">
//         <AddButton label="Add New List" onClick={handleAddList} />
//         <div className="searchContainer">
//           <SearchAppBar onSearchChange={setSearchTerm} />
//         </div>
//         <div className="Container">
//           {status === 'failed' && <p>Error: {error}</p>}
//           {filteredLists.length > 0 ? (
//             <ul className="unorderedList">
//               {filteredLists.map((list) => (
//                 <div key={list.id} className={list.items && list.items.length > 0 ? 'containerList' : 'containerList2'}>
//                   <div className="tag">
//                     <SellOutlinedIcon className='searchIcon'/>
//                   </div>
//                   <Typography variant="h6" component="span" style={{ fontWeight: 600 }}>{list.name}</Typography>
//                   <ul className="ListWrapper">
//                     {list.items && list.items.length > 0 ? (
//                       list.items.map((item, index) => (
//                         <li key={index} className="listItem" style={{ borderBottom: '1px solid #a6a6a6' }}>
//                           {item}
//                         </li>
//                       ))
//                     ) : (
//                       <li>No items available</li>
//                     )}
//                   </ul>
//                   <Button variant="contained" color="primary" onClick={() => handleEditList(list)} style={{ margin: '10px' }}>Edit</Button>
//                   <Button variant="contained" color="warning" onClick={() => handleDeleteList(list.id)} style={{ margin: '10px' }}>Delete</Button>
//                 </div>
//               ))}
//             </ul>
//           ) : (
//             <p>No lists available</p>
//           )}
//         </div>
//       </div>

//       {/* Add List Popup */}
//       <Dialog open={showAddPopup} onClose={handleClosePopup}>
//         <DialogTitle>Add New List</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="List Name"
//             type="text"
//             fullWidth
//             value={listName}
//             onChange={(e) => setListName(e.target.value)}
//           />
//           {listItems.map((item, index) => (
//             <TextField
//               key={index}
//               margin="dense"
//               label={`Item ${index + 1}`}
//               type="text"
//               fullWidth
//               value={item}
//               onChange={(e) => {
//                 const newItems = [...listItems];
//                 newItems[index] = e.target.value;
//                 setListItems(newItems);
//               }}
//               style={{ marginBottom: 8 }}
//             />
//           ))}
//           <Button onClick={() => setListItems([...listItems, ''])}>Add Item</Button>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClosePopup} color="primary">Cancel</Button>
//           <Button onClick={handleAddListSubmit} color="primary">Submit</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Edit List Popup */}
//       <Dialog open={showEditPopup} onClose={handleClosePopup}>
//         <DialogTitle>Edit List</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="List Name"
//             type="text"
//             fullWidth
//             value={listName}
//             onChange={(e) => setListName(e.target.value)}
//           />
//           {listItems.map((item, index) => (
//             <TextField
//               key={index}
//               margin="dense"
//               label={`Item ${index + 1}`}
//               type="text"
//               fullWidth
//               value={item}
//               onChange={(e) => {
//                 const newItems = [...listItems];
//                 newItems[index] = e.target.value;
//                 setListItems(newItems);
//               }}
//               style={{ marginBottom: 8 }}
//             />
//           ))}
//           <Button onClick={() => setListItems([...listItems, ''])}>Add Item</Button>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClosePopup} color="primary">Cancel</Button>
//           <Button onClick={handleAddListSubmit} color="primary">Submit</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default MainComponent;


import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLists, createList, updateList, deleteList } from '../../slices/listsSlice';
import AddButton from '../ButtonComponent/Button';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import Loader from '../Loader/Loader';
import SearchAppBar from '../SearchBar/SearchBar';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import './Main.css';

const MainComponent = () => {
  const dispatch = useDispatch();
  const { lists = [], status, error } = useSelector((state) => state.lists);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLists, setFilteredLists] = useState([]);
  const [editingList, setEditingList] = useState(null); // For editing list
  const [listName, setListName] = useState('');
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLists());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = lists.filter(list =>
        list.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        list.items?.some(item =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredLists(filtered);
    } else {
      setFilteredLists(lists);
    }
  }, [searchTerm, lists]);

  const handleAddList = () => {
    setEditingList(null);
    setListName('');
    setListItems([]);
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
      handleClosePopup();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleDeleteList = (id) => {
    dispatch(deleteList(id));
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
