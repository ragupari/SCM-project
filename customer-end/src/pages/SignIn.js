import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Alert from '../components/Alert';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [success, setSuccess] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!username || !password) {
        setStatus('Please fill in both fields.');
        setSuccess(false);
        return;
    }

    axios.post(`/signin`, { username, password })
        .then(res => {
            console.log(res.data.status); 
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
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Sign In</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Alert message={status} success={success} />
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              onChange = {(e) => setUsername(e.target.value)}
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
              onChange = {(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <a href="/signup">Forgot your password?</a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
