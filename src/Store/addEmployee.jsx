import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Enum for different statuses
export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
})

// Async action to add an employee
export const addEmployee = createAsyncThunk('admin/addEmployee', async ({ name, email, mobileNo, designation, gender, course, img }) => {
    try {
        // Assuming you have an endpoint to add employees
        const response = await fetch('http://localhost:5000/api/v1/admin/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, mobileNo, designation, gender, course, img })
        });

        if (!response.ok) {
            throw new Error('Failed to add Employee');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Failed to add Employee');
    }
});

// Create slice for managing employee state
const employeeSlice = createSlice({
    name: 'addEmployees',
    initialState: {
        data: [], // Employee data
        status: STATUSES.IDLE, // Status of the async operation
        error: null // Error message if any
    },
    reducers: {}, // Additional reducers can be added here if needed
    extraReducers: (builder) => {
        // Handling pending action
        builder.addCase(addEmployee.pending, (state) => {
            state.status = STATUSES.LOADING;
        });
        // Handling fulfilled action
        builder.addCase(addEmployee.fulfilled, (state, action) => {
            state.status = STATUSES.IDLE;
            // Assuming the returned data from server is the added employee
            state.data.push(action.payload);
        });
        // Handling rejected action
        builder.addCase(addEmployee.rejected, (state) => {
            state.status = STATUSES.ERROR;
        });
    }
});

export default employeeSlice.reducer;
