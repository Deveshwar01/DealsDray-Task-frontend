import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchEmployee, deletePro } from '../Store/fetchEmployee'; // Import your slice actions
import { toast } from 'react-hot-toast';

const AllEmployeeField = () => {
    const dispatch = useDispatch();
    const employees = useSelector(state => state.fetchEmployee.data);
    const status = useSelector(state => state.fetchEmployee.status);

    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        dispatch(fetchEmployee());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            dispatch(deletePro(id));
        }
        toast.success('Employee deleted successfully!');
    };

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        if (!sortBy) return 0;
        const fieldA = a[sortBy];
        const fieldB = b[sortBy];
        if (sortBy === 'createdAt') {
            return sortOrder === 'asc' ? new Date(fieldA) - new Date(fieldB) : new Date(fieldB) - new Date(fieldA);
        } else {
            const compareResult = fieldA.localeCompare(fieldB);
            return sortOrder === 'asc' ? compareResult : -compareResult;
        }
    });

    const indexOfLastEmployee = currentPage * itemsPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
    const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'error') {
        return <div>Error fetching data</div>;
    }

    if (!employees || employees.length === 0) {
        return <div>No employees found</div>;
    }

    return (
        <div className="container mx-auto p-10">
            <h2 className="text-2xl font-bold mb-4">All Employees</h2>
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name..."
                    className="border border-gray-300 px-2 py-1 rounded mr-4"
                />
                <div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-gray-300 rounded px-1 py-2 mr-1"
                    >
                        <option value="">Sort By</option>
                        <option value="name">Name</option>
                        <option value="email">Email</option>
                        <option value="createdAt">Create Date</option>
                    </select>
                    <button onClick={() => handleSort(sortBy)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Sort</button>
                </div>
                <Link to="/add-employee" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-4">Add Employee</Link>
            </div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Create Date</th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEmployees.map(employee => (
                        <tr key={employee._id}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{employee._id}</td>
                            <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-200'>
                                <img className='rounded-[50px] w-10 ' src={employee.img} alt="" />
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{employee.name}</td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{employee.email}</td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{new Date(employee.createdAt).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-lg leading-5 font-medium">
                                <Link to={`/edit-employee/${employee._id}`} className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</Link>
                                <button onClick={() => handleDelete(employee._id)} className="text-red-600 hover:text-red-900 ml-6">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ul className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(sortedEmployees.length / itemsPerPage) }).map((_, index) => (
                    <li key={index} className="mx-1">
                        <button onClick={() => paginate(index + 1)} className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}>{index + 1}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllEmployeeField;
