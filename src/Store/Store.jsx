import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Import storage from redux-persist
import createEmployee from './addEmployee';
import fetchEmployee from "./fetchEmployee";
import loginUser from './loginAuth';
import updateEmployee from './editEmployee';

// Combine reducers into a root reducer
const rootReducer = combineReducers({
    addEmployees: createEmployee,
    fetchEmployee: fetchEmployee,
    userLogin: loginUser,
    editEmployee: updateEmployee
});

// Configuration for persisting root reducer
const persistConfig = {
    key: 'root', // Key for the persistor
    storage, // Storage for persisting data
};

// Create a persisted reducer with the root reducer and persist configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Redux store with persisted reducer
export const store = configureStore({
    reducer: persistedReducer, // Use the persisted reducer
});

// Create a persistor for the Redux store
export const persistor = persistStore(store);
