import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Store/Store.jsx'; // Import store and persistor
import Login from './Pages/Login.jsx';
import Header from './components/Header.jsx';
import Admin from './Pages/Admin.jsx';
import AddEmployee from './Pages/AddEmployee.jsx';
import EditEmployee from './Pages/updateEmployee.jsx';
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    // Redux Provider to provide the Redux store to all components
    <Provider store={store}>
      {/* PersistGate to delay rendering until the persisted state is retrieved */}
      <PersistGate loading={null} persistor={persistor}>
        {/* BrowserRouter to set up routing */}
        <BrowserRouter>
          {/* Header component */}
          <Header />
          {/* Routes defined using React Router */}
          <Routes>
            {/* Route for Login page */}
            <Route path='/' element={<Login />} />
            {/* Route for Admin page */}
            <Route path='/admin' element={<Admin />} />
            {/* Route for AddEmployee page */}
            <Route path='/add-employee' element={<AddEmployee />} />
            {/* Route for EditEmployee page with dynamic parameter */}
            <Route path="/edit-employee/:id" element={<EditEmployee />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
      <Toaster/>
    </Provider>
  );
}

export default App;
