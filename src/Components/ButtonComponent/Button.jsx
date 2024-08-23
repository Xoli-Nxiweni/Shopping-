import './Button.css';
import AddIcon from '@mui/icons-material/Add';
// import ClearIcon from '@mui/icons-material/Clear';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

// eslint-disable-next-line react/prop-types
const AddButton = ({ onAdd /*onClear*/} ) => {
  return (
    <div className='addButton'>
      <button className='Btn' onClick={onAdd}>
        <AddIcon />
      </button>
      <button>
        <ShareOutlinedIcon />
      </button>

      {/* <button className='Btn2' onClick={onClear}>
        <DeleteOutlinedIcon/>
      </button> */}
    </div>
  );
};

export default AddButton;
