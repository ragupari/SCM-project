import React, { useState } from 'react';
import axios from 'axios';
import Alert from '../components/Alert';

function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const [success, setSuccess] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!fullName || !email || !username || !password || !confirmPassword) {
        setStatus('Please fill in all fields.');
        setSuccess(false);
        return;
    }

    if (password !== confirmPassword) {
        setStatus('Passwords do not match.');
        setSuccess(false);
        return;
    }

    axios.post(`/signup`, { fullName, email, username, password, confirmPassword })
        .then(res => {
            console.log(res.data.status);
            console.log(res.data.err);
            setStatus(res.data.status);
            setSuccess(res.data.success);

            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                window.location.href = '/home';
            }
        })
        .catch(err => {
            console.log(err);
            setStatus('An error occurred. Please try again.');
            setSuccess(false);
        });
  }

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100 ">
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <Alert message={status} success={success} />
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              placeholder="Enter your full name"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <a href="/signin">Already have an account? Sign In</a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
