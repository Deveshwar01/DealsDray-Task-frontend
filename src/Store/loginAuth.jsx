import Cookies from 'js-cookie';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Enum for different statuses
export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
});

// Define an async thunk for user login
export const loginUser = createAsyncThunk('user/login', async (userData) => {
    try {
        const response = await fetch('http://localhost:5000/api/v1/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error('Failed to log in user');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Failed to log in user');
    }
});

// Define an async thunk for user logout
export const logoutUser = createAsyncThunk('user/logout', async () => {
    try {
        // Remove the token from cookies
        Cookies.remove('token');
        return null;
    } catch (error) {
        throw new Error('Failed to log out user');
    }
});

// Slice for managing user state
const userSlice = createSlice({
    name: 'userLogin',
    initialState: {
        data: null, // User data
        message: null, // Message received after login
        status: 'idle', // Status of the async operation
        error: null // Error message if any
    },
    reducers: {}, // Additional reducers can be added here if needed
    extraReducers: (builder) => {
        // Handling pending action for loginUser
        builder.addCase(loginUser.pending, (state) => {
            state.status = 'loading';
        });
        // Handling fulfilled action for loginUser
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.data = action.payload;
            state.message = action.payload.message;
            if (state.message) {
                console.log(state.message); // Logging message if it exists
            }
            state.token = action.payload.token; // Accessing the token property of the payload
            Cookies.set('token', state.token); // Set the token in a cookie named 'token'
            state.status = 'idle';
        });
        // Handling rejected action for loginUser
        builder.addCase(loginUser.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.error.message;
        });
        // Handling pending action for logoutUser
        builder.addCase(logoutUser.pending, (state) => {
            state.status = 'loading';
        });
        // Handling fulfilled action for logoutUser
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.data = null;
            state.token = null;
            state.status = 'idle';
        });
        // Handling rejected action for logoutUser
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.error.message;
        });
    }
});

export default userSlice.reducer;

// Selector to get the message from the user state
export const selectMessage = (state) => state.userLogin.message;
