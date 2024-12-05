/* eslint-disable no-undef */
import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import '../../pages/LoginSignup/LoginSignup.css'; // Importing the regular CSS file
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  function handleGoogleLogin() {
    alert('Not working yet want to contribute to the project?');
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/users/auth/google`;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.status !== 200) {
        if (data.message === 'Invalid credentials') {
          toast.error('Invalid email or password. Please try again.');
        }
        return;
      }
      if (data.error) {
        toast.error(data.error);
        return;
      }
      if (data.token) {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userId', data.userId);
        toast.success('Login successful!');
        navigate('/');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
      console.error('Error:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="sign-in-form">
      <h2 className="title">Sign In</h2>
      <div className="input-field">
        <FaUser className="icon" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-field">
        <FaLock className="icon" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <input type="submit" value="Login" className="bg-black text-white px-32 mt-3 py-3 rounded-full hover:underline" />
      <p className="social-text">Or Sign in with social platforms</p>
      <div className="social-media">
        <div className="social-icon" onClick={handleGoogleLogin}>
          <FcGoogle className="googleIcon" /> Sign in with Google
        </div>
      </div>
    </form>
  );
}
