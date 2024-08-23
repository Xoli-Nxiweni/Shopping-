import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Helper functions for localStorage
const saveListsToLocalStorage = (lists) => {
  localStorage.setItem('lists', JSON.stringify(lists));
};

const fetchListsFromLocalStorage = () => {
  const lists = localStorage.getItem('lists');
  return lists ? JSON.parse(lists) : [];
};

// Fetch lists for a specific user
export const fetchLists = createAsyncThunk('lists/fetchLists', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:5000/users/1');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (!data.lists || !Array.isArray(data.lists)) {
      throw new Error('Unexpected data format');
    }
    saveListsToLocalStorage(data.lists); // Save to localStorage
    return data.lists;
  } catch (error) {
    console.error('Error fetching lists:', error);
    return fetchListsFromLocalStorage(); // Use localStorage data if offline
  }
});

// Create a new list
export const createList = createAsyncThunk('lists/createList', async (newList, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:5000/users/1/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newList),
    });
    if (!response.ok) {
      throw new Error('Failed to create list');
    }
    const data = await response.json();
    const lists = fetchListsFromLocalStorage(); // Get current lists
    lists.push(data);
    saveListsToLocalStorage(lists); // Save updated lists to localStorage
    return data;
  } catch (error) {
    console.error('Error creating list:', error);
    return rejectWithValue(error.message);
  }
});

// Update an existing list
export const updateList = createAsyncThunk('lists/updateList', async (updatedList, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:5000/users/1/lists/${updatedList.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedList),
    });
    if (!response.ok) {
      throw new Error('Failed to update list');
    }
    const data = await response.json();
    const lists = fetchListsFromLocalStorage();
    const index = lists.findIndex(list => list.id === data.id);
    if (index >= 0) {
      lists[index] = data;
      saveListsToLocalStorage(lists); // Save updated lists to localStorage
    }
    return data;
  } catch (error) {
    console.error('Error updating list:', error);
    return rejectWithValue(error.message);
  }
});

// Delete a list
export const deleteList = createAsyncThunk('lists/deleteList', async (listId, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:5000/users/1/lists/${listId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete list');
    }
    const lists = fetchListsFromLocalStorage();
    const updatedLists = lists.filter(list => list.id !== listId);
    saveListsToLocalStorage(updatedLists); // Save updated lists to localStorage
    return listId;
  } catch (error) {
    console.error('Error deleting list:', error);
    return rejectWithValue(error.message);
  }
});

const listsSlice = createSlice({
  name: 'lists',
  initialState: {
    lists: fetchListsFromLocalStorage(), // Get initial state from localStorage
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch lists
      .addCase(fetchLists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lists = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Create a list
      .addCase(createList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lists.push(action.payload);
      })
      .addCase(createList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Update a list
      .addCase(updateList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.lists.findIndex(list => list.id === action.payload.id);
        if (index >= 0) {
          state.lists[index] = action.payload;
        }
      })
      .addCase(updateList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Delete a list
      .addCase(deleteList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lists = state.lists.filter(list => list.id !== action.payload);
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default listsSlice.reducer;
