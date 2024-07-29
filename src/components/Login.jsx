import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const handleSubmit = () => {
        console.log(password, user);
        document.querySelector('button').style.scale = 1.12
        if (user && password) {
            console.log('clicked');
            dispatch(login({ user }))
            navigate('/posts');
            setUser(null)
            setPassword(null);
        } else {
            // do something
        }

    }
    const isEnabled = user && password;
    return (
        <div className='w-[60vw] mx-auto flex flex-col  text-3xl bg-[#0a1222] justify-center h-[70vh] movingBorders'>
            <h2 className='text-white m-5'>Login</h2>
            <input
                className='w-[70%] m-5 bg-inherit text-white p-3 rounded-lg hover:bg-black hover:opacity-50 '
                type="text"
                placeholder='Enter your userName' onChange={(e) => setUser(e.target.value)} value={user} />
            <input
                className='w-[70%] m-5 bg-inherit text-white p-3 rounded-lg hover:bg-black hover:opacity-50'
                type="password" placeholder='Enter the Password' onChange={(e) => setPassword(e.target.value)} value={password} />
            <button
                type='submit'
                className="m-5 border-white border-2 text-white p-3 rounded-lg hover:bg-black  w-[30%] hover:scale-105 duration-200"
                onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Login