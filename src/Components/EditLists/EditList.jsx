import { useState } from 'react';
import './EditListPopup.css';

// eslint-disable-next-line react/prop-types
const EditListPopup = ({ onClose, onSubmit, list }) => {
  const [name, setName] = useState(list?.name || '');
  const [items, setItems] = useState(list?.items || []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleItemChange = (index, value) => {
    const newItems = [...items];
    newItems[index].name = value;
    setItems(newItems);
  };

  const handleQuantityChange = (index, value) => {
    const newItems = [...items];
    newItems[index].quantity = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { name: '', quantity: '' }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...list, name, items });
  };

  return (
    <div>
      <h2>Edit List</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>List Name:</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Items:</label>
          {items.map((item, index) => (
            <div key={index} className="item-group">
              <input
                type="text"
                placeholder="Item name"
                value={item.name}
                onChange={(e) => handleItemChange(index, e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
              />
              <button type="button" onClick={() => handleRemoveItem(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddItem}>Add Item</button>
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditListPopup;
