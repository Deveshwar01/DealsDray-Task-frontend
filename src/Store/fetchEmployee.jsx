import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Enum for different statuses
export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
});

// Async action to fetch employees
export const fetchEmployee = createAsyncThunk('pro/fetch', async () => {
    try {
        const res = await fetch("http://localhost:5000/api/v1/admin/employees");
        const data = await res.json();
        return data.employees;
    } catch (error) {
        throw error;
    }
});

// Async action to delete an employee
export const deletePro = createAsyncThunk('pro/delete', async (Id) => {
    try {
        await fetch(`http://localhost:5000/api/v1/admin/employees/${Id}`, {
            method: 'DELETE'
        });
        return Id;
    } catch (error) {
        throw error;
    }
});

// Slice for managing employee state
const proSlice = createSlice({
    name: 'fetchEmployee',
    initialState: {
        data: [], // Employee data
        status: '', // Status of the async operation
    },
    reducers: {
        // Reducer to set employee data
        setPro(state, action) {
            state.data = action.payload
        },
        // Reducer to set status
        setStatus(state, action) {
            state.status = action.payload
        },
    },
    extraReducers: (builder) => {
        // Handling pending action for fetchEmployee
        builder.addCase(fetchEmployee.pending, (state, action) => {
            state.status = STATUSES.LOADING
        });
        // Handling fulfilled action for fetchEmployee
        builder.addCase(fetchEmployee.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
        });
        // Handling rejected action for fetchEmployee
        builder.addCase(fetchEmployee.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        });
        // Handling pending action for deletePro
        builder.addCase(deletePro.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        });
        // Handling fulfilled action for deletePro
        builder.addCase(deletePro.fulfilled, (state, action) => {
            // Remove the deleted employee from the state
            state.data = state.data.filter(employee => employee._id !== action.payload);
            state.status = STATUSES.IDLE;
        });
        // Handling rejected action for deletePro
        builder.addCase(deletePro.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        });
    }
});

// Export slice actions
export const { setPro, setStatus } = proSlice.actions;
export default proSlice.reducer;
