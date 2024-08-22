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

// import './AddListPopup.css';
// import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

// // eslint-disable-next-line react/prop-types
// const AddListPopup = ({ onClose }) => {
//   return (
//     <div className="popupOverlay">
//       <div className="popupContent">
//         <h2>Add New List</h2>
//         <form>
//           <input type="text" placeholder="List Name" />
//           <input type="text" placeholder="Item 1" />
//           <input type="text" placeholder="Item 2" />
//           <input type="number" placeholder="Quantity" />
//           <input type="dropdown" placeholder="Category" />
//           {/* Add more fields as needed */}
//           <button type="submit">Add List</button>
//         <button onClick={onClose} className="closeButton"><CancelOutlinedIcon/></button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddListPopup;

// import { useState } from 'react';
// import './AddListPopup.css';
// import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

// const AddListPopup = ({ onClose, onSubmit, list }) => {
//   const [name, setName] = useState(list ? list.name : '');
//   const [items, setItems] = useState(list ? list.items : [{ name: '', quantity: '' }]);
//   const [category, setCategory] = useState(list ? list.category : '');

//   const handleItemChange = (index, field, value) => {
//     const newItems = [...items];
//     newItems[index][field] = value;
//     setItems(newItems);
//   };

//   const handleAddItem = () => {
//     setItems([...items, { name: '', quantity: '' }]);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const updatedList = {
//       id: list ? list.id : Date.now(), // Use timestamp for new lists
//       name,
//       items,
//       category,
//     };
//     onSubmit(updatedList);
//   };

//   return (
//     <div className="popupOverlay">
//       <div className="popupContent">
//         <h2>{list ? 'Edit List' : 'Add New List'}</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>List Name:</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="List Name"
//               required
//             />
//           </div>
//           {items.map((item, index) => (
//             <div key={index} className="itemFields">
//               <input
//                 type="text"
//                 value={item.name}
//                 onChange={(e) => handleItemChange(index, 'name', e.target.value)}
//                 placeholder={`Item ${index + 1} Name`}
//                 required
//               />
//               <input
//                 type="number"
//                 value={item.quantity}
//                 onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
//                 placeholder="Quantity"
//                 required
//               />
//             </div>
//           ))}
//           <button type="button" onClick={handleAddItem}>
//             Add Item
//           </button>
//           <div>
//             <label>Category:</label>
//             <select value={category} onChange={(e) => setCategory(e.target.value)}>
//               <option value="">Select Category</option>
//               <option value="Groceries">Groceries</option>
//               <option value="Household">Household</option>
//               <option value="Electronics">Electronics</option>
//               {/* Add more categories as needed */}
//             </select>
//           </div>
//           <button type="submit">Save List</button>
//           <button type="button" onClick={onClose} className="closeButton">
//             <CancelOutlinedIcon />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddListPopup;

// import { useState, useEffect } from 'react';
// import './AddListPopup.css';
// import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

// const AddListPopup = ({ onClose, onSubmit, list }) => {
//   const [name, setName] = useState('');
//   const [items, setItems] = useState([{ name: '', quantity: '' }]);
//   const [category, setCategory] = useState('');

//   // Initialize state when list prop changes
//   useEffect(() => {
//     if (list) {
//       // eslint-disable-next-line react/prop-types
//       setName(list.name || '');
//       // eslint-disable-next-line react/prop-types
//       setItems(list.items || [{ name: '', quantity: '' }]);
//       // eslint-disable-next-line react/prop-types
//       setCategory(list.category || '');
//     }
//   }, [list]);

//   const handleItemChange = (index, field, value) => {
//     const newItems = [...items];
//     newItems[index][field] = value;
//     setItems(newItems);
//   };

//   const handleAddItem = () => {
//     setItems([...items, { name: '', quantity: '' }]);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (!name) {
//       // Handle validation
//       alert('List name is required');
//       return;
//     }
//     const updatedList = {
//       // eslint-disable-next-line react/prop-types
//       id: list ? list.id : Date.now().toString(), // Convert timestamp to string
//       name,
//       items,
//       category,
//     };
//     onSubmit(updatedList);
//   };

//   return (
//     <div className="popupOverlay">
//       <div className="popupContent">
//         <h2>{list ? 'Edit List' : 'Add New List'}</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="listName">List Name:</label>
//             <input
//               id="listName"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="List Name"
//               required
//             />
//           </div>
//             <div key={index} className="itemFields">
//               <input
//                 type="text"
//                 value={item.name}
//                 onChange={(e) => handleItemChange(index, 'name', e.target.value)}
//                 placeholder={`Item ${index + 1} Name`}
//                 required
//               />
//               <input
//                 type="number"
//                 value={item.quantity}
//                 onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
//                 placeholder="Quantity"
//                 required
//               />
//             </div>
//           <button type="button" onClick={handleAddItem}>
//             Add Item
//           </button>
//           <div>
//             <label htmlFor="category">Category:</label>
//             <select
//               id="category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//             >
//               <option value="">Select Category</option>
//               <option value="Groceries">Groceries</option>
//               <option value="Household">Household</option>
//               <option value="Electronics">Electronics</option>
//               {/* Add more categories as needed */}
//             </select>
//           </div>
//           <button type="submit">Save List</button>
//           <button type="button" onClick={onClose} className="closeButton">
//             <CancelOutlinedIcon />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddListPopup;

import { useState, useEffect } from 'react';
import './AddListPopup.css';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const AddListPopup = ({ onClose, onSubmit, list }) => {
  const [name, setName] = useState('');
  const [items, setItems] = useState([{ name: '', quantity: '' }]);
  const [category, setCategory] = useState('');

  // Initialize state when list prop changes
  useEffect(() => {
    if (list) {
      setName(list.name || '');
      setItems(list.items || [{ name: '', quantity: '' }]);
      setCategory(list.category || '');
    }
  }, [list]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { name: '', quantity: '' }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) {
      alert('List name is required');
      return;
    }
    const updatedList = {
      // eslint-disable-next-line react/prop-types
      id: list ? list.id : Date.now().toString(),
      name,
      items,
      category,
    };
    onSubmit(updatedList);
  };

  return (
    <div className="popupOverlay">
      <div className="popupContent">
        <h2>{list ? 'Edit List' : 'Add New List'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="listName">List Name:</label>
            <input
              id="listName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="List Name"
              required
            />
          </div>
          {/* Directly render the first item input fields */}
          <div className="itemFields">
            <input
              type="text"
              value={items[0]?.name || ''}
              onChange={(e) => handleItemChange(0, 'name', e.target.value)}
              placeholder="Item 1 Name"
              required
            />
            <input
              type="number"
              value={items[0]?.quantity || ''}
              onChange={(e) => handleItemChange(0, 'quantity', e.target.value)}
              placeholder="Quantity"
              required
            />
          </div>
          {/* Repeat for additional items if needed */}
          {/* For a fixed number of items, you can add similar blocks for items[1], items[2], etc. */}

          <button type="button" onClick={handleAddItem}>
            Add Item
          </button>
          <div>
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Groceries">Groceries</option>
              <option value="Household">Household</option>
              <option value="Electronics">Electronics</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <button type="submit">Save List</button>
          <button type="button" onClick={onClose} className="closeButton">
            <CancelOutlinedIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddListPopup;
