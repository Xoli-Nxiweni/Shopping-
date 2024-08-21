// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { createList } from '../../slices/listsSlice';
// import './AddListPopup.css';

// const AddListPopup = ({ onClose }) => {
//   const dispatch = useDispatch();
//   const [listName, setListName] = useState('');
//   const [category, setCategory] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [items, setItems] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/categories');
//         if (!response.ok) throw new Error('Failed to fetch categories');
//         const data = await response.json();
//         setCategories(data);
//         if (data.length > 0) setCategory(data[0]); // Set default category
//       } catch (err) {
//         setError('Failed to load categories');
//       }
//     };
    
//     fetchCategories();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (listName.trim() === '' || items.trim() === '') {
//       setError('List name and items cannot be empty');
//       return;
//     }

//     const newList = {
//       name: listName,
//       category,
//       items: items.split('\n').map(item => item.trim()).filter(item => item !== '') // Split items by line
//     };

//     try {
//       await dispatch(createList(newList)).unwrap();
//       onClose();
//     } catch (err) {
//       setError('Failed to add list');
//     }
//   };

//   return (
//     <div className="popup-overlay">
//       <div className="popup-content">
//         <button className="close-btn" onClick={onClose}>✖</button>
//         <h2>Add New List</h2>
//         {error && <p className="error">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="listName">List Name</label>
//             <input
//               type="text"
//               id="listName"
//               value={listName}
//               onChange={(e) => setListName(e.target.value)}
//               placeholder="Enter list name"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="category">Category</label>
//             <select
//               id="category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//             >
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="items">Items</label>
//             <textarea
//               id="items"
//               value={items}
//               onChange={(e) => setItems(e.target.value)}
//               placeholder="Enter items (one per line)"
//               rows="4"
//             />
//           </div>
//           <button type="submit" className="submit-btn">Add List</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddListPopup;

import './AddListPopup.css';

// eslint-disable-next-line react/prop-types
const AddListPopup = ({ onClose }) => {
  return (
    <div className="popupOverlay">
      <div className="popupContent">
        <h2>Add New List</h2>
        <form>
          <input type="text" placeholder="List Name" />
          <input type="text" placeholder="Item 1" />
          <input type="text" placeholder="Item 2" />
          {/* Add more fields as needed */}
          <button type="submit">Add List</button>
        </form>
        <button onClick={onClose} className="closeButton">Close</button>
      </div>
    </div>
  );
};

export default AddListPopup;
