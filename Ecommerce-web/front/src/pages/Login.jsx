import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import instance from "../axiosConfig";
import { useAuth } from '../context/AuthProvider';

function Login() {
    const [data, setData] = useState({ email: "", password: "" });
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await instance.post("/user/login", data, { withCredentials: true });
            
            if (response.status === 200) {
                login(); 
                navigate("/");
            }
        } catch (error) {
            console.log("Login Error:", error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='Enter Email' name='email' value={data.email} onChange={handleChange} />
                <input type="password" placeholder='Enter Password' name="password" value={data.password} onChange={handleChange} />
                <button type='submit'>Login</button>
            </form>
            <p>New user? <Link to="/user/register">Register</Link></p>
        </>
    );
}

export default Login;
