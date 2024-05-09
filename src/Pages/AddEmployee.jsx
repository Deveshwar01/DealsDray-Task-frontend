import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../Store/addEmployee'; // Import your addEmployee action
import { toast } from 'react-hot-toast';

const AddEmployeeForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        course: '',
        img: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Basic input validation
            if (!formData.name || !formData.email || !formData.mobileNo || !formData.designation || !formData.gender || !formData.course || !formData.img) {
                throw new Error('Please fill in all fields.');
            }
            await dispatch(addEmployee(formData)); // Dispatch addEmployee action with form data
            // Clear form fields after successful submission
            setFormData({
                name: '',
                email: '',
                mobileNo: '',
                designation: '',
                gender: '',
                course: '',
                img: ''
            });
            toast.success('Employee added successfully!');
            setError(null); // Reset error state
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Add Employee</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-4">
                    <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                {/* Email */}
                <div className="mb-4">
                    <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                {/* Mobile No */}
                <div className="mb-4">
                    <input type="text" placeholder="Mobile No" name="mobileNo" value={formData.mobileNo} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                {/* Designation */}
                <div className="mb-4">
                    <select name="designation" value={formData.designation} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500">
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                {/* Gender */}
                <div className="mb-4">
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                {/* Course */}
                <div className="mb-4">
                    <select name="course" value={formData.course} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500">
                        <option value="">Select Course</option>
                        <option value="Course A">Course A</option>
                        <option value="Course B">Course B</option>
                        <option value="Course C">Course C</option>
                    </select>
                </div>
                {/* Image URL */}
                <div className="mb-4">
                    <input type="text" placeholder="Image URL" name="img" value={formData.img} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployeeForm;
