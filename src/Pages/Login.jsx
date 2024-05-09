import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, STATUSES } from '../Store/loginAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
const Login = () => {
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.userLogin.status);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
    navigate('/admin');
    toast.success('admin logged in successfully!');
  };

  return (
    <div className="flex justify-center items-center p-20">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded border w-[400px] ">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            className="mt-1 block w-full border-gray-300 rounded-md border sm:text-sm py-2 px-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your Email'
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="password"
            className="mt-1 block w-full border-gray-300 rounded-md border sm:text-sm py-2 px-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={loginStatus === STATUSES.LOADING}
        >
          {loginStatus === STATUSES.LOADING ? 'Logging in...' : 'Sign in'}
        </button>
        {loginStatus === STATUSES.ERROR && (
          <p className="text-red-500 mt-2">Failed to log in. Please try again.</p>
        )}
      </form>
    </div>
  );
};

export default Login;
