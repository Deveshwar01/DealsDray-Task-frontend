import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchEmployee } from '../Store/fetchEmployee';
import { editEmployee } from '../Store/editEmployee';
import { toast } from 'react-hot-toast';

const EditEmployee = () => {
  const { id } = useParams(); // Get the id parameter from the URL
  const dispatch = useDispatch(); // Initialize dispatch function
  const employees = useSelector(state => state.fetchEmployee.data); // Get employees from Redux store
  const [employee, setEmployee] = useState({}); // State for selected employee
  const [formData, setFormData] = useState({}); // State for form data
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(null); // State for error message

  // Fetch employee data by id when component mounts
  useEffect(() => {
    setLoading(true);
    dispatch(fetchEmployee(id))
      .then(() => setLoading(false))
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [dispatch, id]);

  // Update formData and employee states when employees change
  useEffect(() => {
    const selectedEmployee = employees.find(emp => emp._id === id);
    setEmployee(selectedEmployee || {});
    setFormData(selectedEmployee || {});
  }, [employees, id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(editEmployee({ _id: id, ...formData }))
      .then(() => {
        setLoading(false);
        toast.success('Employee updated successfully!');
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 ">Edit Employee</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input type="text" name="name" value={formData.name || ''} onChange={handleChange} placeholder="Name" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <input type="email" name="email" value={formData.email || ''} onChange={handleChange} placeholder="Email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <input type="text" name="mobileNo" value={formData.mobileNo || ''} onChange={handleChange} placeholder="Phone Number" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <input type="text" name="img" value={formData.img || ''} onChange={handleChange} placeholder="Image URL" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        {/* Dropdown for Designation */}
        <div>
          <label htmlFor="designation">Designation:</label>
          <select name="designation" id="designation" value={formData.designation || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
            <option value="">Select Designation</option>
            <option value="Intern">Intern</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
          </select>
        </div>
        {/* Dropdown for Gender */}
        <div>
          <label htmlFor="gender">Gender:</label>
          <select name="gender" id="gender" value={formData.gender || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        {/* Dropdown for Course */}
        <div>
          <label htmlFor="course">Course:</label>
          <select name="course" id="course" value={formData.course || ''} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500">
            <option value="">Select Course</option>
            <option value="B.Tech">B.Tech</option>
            <option value="BBA">BBA</option>
            <option value="BCA">BCA</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
