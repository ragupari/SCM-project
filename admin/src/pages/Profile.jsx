import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import '../components/Style.css';
import Alert from '../components/Alert';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [profileImg, setImg] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [status, setStatus] = useState('');
  const [success, setSuccess] = useState('');

  const getUsernameFromToken = async () => {
    try {
      const res = await axios.get('/tokenauth', {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      });
      setUsername(res.data.username);
      return res.data.username;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = await getUsernameFromToken();
        if (!username) {
          throw new Error('No username found in token');
        }

        const res = await axios.post('/profile', { username });
        const { name, email, img, address, city } = res.data;
          setName(name);
          setEmail(email);
          setImg(img);
          setAddress(address);
          setCity(city);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const res = await axios.put('/profile',
        { username, name, email, password, profileImg, address, city });
      if (res.status === 200) {
        setSuccess(true);
        setStatus(res.data.message);
      } else {
        setSuccess(false);
        setStatus(res.data.message);
      }
    } catch (error) {
      setSuccess(false);
      setStatus('Error updating profile'); 
    }
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
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              <button className="btn btn-primary gradient-btn mb-1" onClick={handleSave}>
                Save Changes
              </button>
              <Alert message={status} success={success} />
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProfilePage;
