import './Button.css';
import AddIcon from '@mui/icons-material/Add';
// import ClearIcon from '@mui/icons-material/Clear';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

// eslint-disable-next-line react/prop-types
const AddButton = ({ onAdd } ) => {
  return (
    <div className='addButton'>
      <button className='Btn' onClick={onAdd}>
        <AddIcon />
      </button>
    </div>
  );
};

export default AddButton;
