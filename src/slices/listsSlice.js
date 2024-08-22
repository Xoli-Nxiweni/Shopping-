// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Fetch lists
// export const fetchLists = createAsyncThunk('lists/fetchLists', async () => {
//   const response = await fetch('http://localhost:5000/users/1/'); // Adjust the endpoint to fetch the user and their lists
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   const data = await response.json();

//   // Extract the lists from the response
//   if (!data.lists || !Array.isArray(data.lists)) {
//     throw new Error('Unexpected data format');
//   }

//   return data.lists; // Return the lists array from the data
// });

// // Create a new list
// export const createList = createAsyncThunk('lists/createList', async (newList) => {
//   const response = await fetch('http://localhost:5000/users/1/lists', { // Adjust the endpoint as needed
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newList),
//   });
//   if (!response.ok) {
//     throw new Error('Failed to create list');
//   }
//   return response.json();
// });

// // Update an existing list
// export const updateList = createAsyncThunk('lists/updateList', async (updatedList) => {
//   const response = await fetch(`http://localhost:5000/users/1/lists/${updatedList.id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(updatedList),
//   });
//   if (!response.ok) {
//     throw new Error('Failed to update list');
//   }
//   return response.json(); // Ensure the response is in JSON format
// });


// // Delete a list
// export const deleteList = createAsyncThunk('lists/deleteList', async (listId) => {
//   const response = await fetch(`http://localhost:5000/users/1/lists/${listId}`, { // Fixed URL
//     method: 'DELETE',
//   });
//   console.log(response);
  
//   if (!response.ok) {
//     throw new Error('Failed to delete list');
//   }
//   return listId;
// });


// const listsSlice = createSlice({
//   name: 'lists',
//   initialState: {
//     lists: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch lists
//       .addCase(fetchLists.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchLists.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.lists = action.payload;
//       })
//       .addCase(fetchLists.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       // Create a list
//       .addCase(createList.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(createList.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.lists.push(action.payload);
//       })
//       .addCase(createList.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       // Update a list
//       .addCase(updateList.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(updateList.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         const index = state.lists.findIndex(list => list.id === action.payload.id);
//         if (index >= 0) {
//           state.lists[index] = action.payload;
//         }
//       })
//       .addCase(updateList.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       // Delete a list
//       .addCase(deleteList.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(deleteList.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.lists = state.lists.filter(list => list.id !== action.payload);
//       })
//       .addCase(deleteList.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export default listsSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Fetch lists
// export const fetchLists = createAsyncThunk('lists/fetchLists', async (_, { rejectWithValue }) => {
//   try {
//     const response = await fetch('http://localhost:5000/users/1/');
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data = await response.json();
//     if (!data.lists || !Array.isArray(data.lists)) {
//       throw new Error('Unexpected data format');
//     }
//     return data.lists;
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// // Create a new list
// export const createList = createAsyncThunk('lists/createList', async (newList, { rejectWithValue }) => {
//   try {
//     const response = await fetch('http://localhost:5000/users/1/lists', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newList),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to create list');
//     }
//     return response.json();
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// // Update an existing list
// export const updateList = createAsyncThunk('lists/updateList', async (updatedList) => {
//   const response = await fetch(`http://localhost:5000/users/1/lists/${updatedList.id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(updatedList),
//   });

//   console.log('Response:', response); // Log the response to see the status and any potential errors

//   if (!response.ok) {
//     const error = await response.json(); // Try to parse the error message if it's in JSON format
//     throw new Error(error.message || 'Failed to update list');
//   }
//   return response.json(); // Ensure the response is in JSON format
// });


// // Delete a list
// export const deleteList = createAsyncThunk('lists/deleteList', async (listId, { rejectWithValue }) => {
//   try {
//     const response = await fetch(`http://localhost:5000/users/1/lists/${listId}`, {
//       method: 'DELETE',
//     });
//     if (!response.ok) {
//       throw new Error('Failed to delete list');
//     }
//     return listId;
//   } catch (error) {
//     return rejectWithValue(error.message);
//   }
// });

// const listsSlice = createSlice({
//   name: 'lists',
//   initialState: {
//     lists: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLists.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchLists.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.lists = action.payload;
//       })
//       .addCase(fetchLists.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(createList.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(createList.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.lists.push(action.payload);
//       })
//       .addCase(createList.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(updateList.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(updateList.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         const index = state.lists.findIndex(list => list.id === action.payload.id);
//         if (index >= 0) {
//           state.lists[index] = action.payload;
//         }
//       })
//       .addCase(updateList.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(deleteList.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(deleteList.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.lists = state.lists.filter(list => list.id !== action.payload);
//       })
//       .addCase(deleteList.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export default listsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch lists for a specific user
export const fetchLists = createAsyncThunk('lists/fetchLists', async () => {
  const response = await fetch('http://localhost:5000/users/1'); // Fetch user data
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  if (!data.lists || !Array.isArray(data.lists)) {
    throw new Error('Unexpected data format');
  }
  return data.lists;
});

// Create a new list
export const createList = createAsyncThunk('lists/createList', async (newList) => {
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
  return response.json();
});

// Update an existing list
export const updateList = createAsyncThunk('lists/updateList', async (updatedList) => {
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
  return response.json();
});

// Delete a list
export const deleteList = createAsyncThunk('lists/deleteList', async (listId) => {
  const response = await fetch(`http://localhost:5000/users/1/lists/${listId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete list');
  }
  return listId;
});

const listsSlice = createSlice({
  name: 'lists',
  initialState: {
    lists: [],
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
