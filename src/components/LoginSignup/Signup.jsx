/* eslint-disable no-undef */
import { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../../pages/LoginSignup/LoginSignup.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, fullName }),
      });

      const data = await res.json();
      if (res.status === 409) {
        toast.error(data.message);
        return;
      }
      if (res.ok) {
        // Handle successful response
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userId', data.userId);
        navigate('/');
        toast.success('Signup successful!');
      } else {
        console.log(data.error);
        // Handle errors
        toast.error(data.message);
      }
    } catch (e) {
      console.error('An unexpected error occurred:', e);
      toast.error('An unexpected error occurred');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="sign-up-form">
      <h2 className="title">Sign Up</h2>
      <div className="input-field">
        <FaUser className="icon" />
        <input
          type="text"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="input-field">
        <FaUser className="icon" />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="input-field">
        <FaEnvelope className="icon" />
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

      <input type="submit" value="Sign Up" className="bg-black text-white px-10 mt-3 py-[14px] rounded-full hover:underline" />
    </form>
  );
}
