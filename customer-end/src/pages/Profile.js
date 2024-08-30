import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import '../components/Style.css';

const ProfilePage = () => {
  const [name, setName] = useState('Parishith Ragumar');
  const [email, setEmail] = useState('parishith@example.com');
  const [password, setPassword] = useState('');

  const handleSave = () => {
    // Handle save logic here (e.g., API call)
    console.log('Profile updated:', { name, email, password });
  };

  return (
    <div>
                <NavBar currentPage={'Profile'} />
                <div className='container'>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mt-5">
            <div className="card-header text-center gradient-text-">
              <h2>Edit Profile</h2>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 text-center">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                    className="rounded-circle img-fluid"
                  />
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              <button className="btn btn-primary gradient-btn" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProfilePage;
