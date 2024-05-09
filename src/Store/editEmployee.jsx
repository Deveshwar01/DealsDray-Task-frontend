import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Enum for different statuses
export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading'
});

// Async action to edit an employee
export const editEmployee = createAsyncThunk('admin/editEmployee', async ({ _id, name, email, mobileNo, designation, gender, course, img }) => {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/admin/employees/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, mobileNo, designation, gender, course, img })
    });

    if (!response.ok) {
      throw new Error('Failed to edit Employee');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to edit Employee');
  }
});

// Create slice for managing edit employee state
const editEmployeeSlice = createSlice({
  name: 'editEmployee',
  initialState: {
    data: null, // Edited employee data
    status: STATUSES.IDLE, // Status of the async operation
    error: null // Error message if any
  },
  reducers: {}, // Additional reducers can be added here if needed
  extraReducers: (builder) => {
    // Handling pending action
    builder.addCase(editEmployee.pending, (state) => {
      state.status = STATUSES.LOADING;
    });
    // Handling fulfilled action
    builder.addCase(editEmployee.fulfilled, (state, action) => {
      state.status = STATUSES.IDLE;
      state.data = action.payload;
    });
    // Handling rejected action
    builder.addCase(editEmployee.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
      state.error = action.error.message;
    });
  }
});

export default editEmployeeSlice.reducer;
