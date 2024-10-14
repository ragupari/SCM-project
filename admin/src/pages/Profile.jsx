import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Badge, Row, Col } from 'react-bootstrap';

const storeMap = [
  { storeID: 1, name: 'Colombo ' },
  { storeID: 2, name: 'Negombo ' },
  { storeID: 3, name: 'Galle ' },
  { storeID: 4, name: 'Matara ' },
  { storeID: 5, name: 'Jaffna ' },
  { storeID: 6, name: 'Trinco ' },
  { storeID: 7, name: 'Main - Kandy ' },
];

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [managerID, setManagerID] = useState('');
  const storeID = localStorage.getItem('storeID');

  const getUsernameFromToken = async () => {
    try {
      const res = await axios.get('/admintokenauth', {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      });
      setUsername(res.data.username);
      setRole(res.data.role);
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

        const res = await axios.get(`/adminprofile/${username}`);
        const { FullName, Email, ManagerID } = res.data;
        setName(FullName);
        setEmail(Email);
        setManagerID(ManagerID);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card className="shadow-lg rounded" style={{ width: '50%', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
        <Card.Body>
          {/* Profile Image and Grid layout */}
          <Row className="align-items-center">
            <Col md={4} className="text-center">
              {/* Profile Image */}
              <div className="profile-image" style={{
                width: '120px',
                height: '120px',
                backgroundColor: '#62c9fc',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto'
              }}>
                <p className="text-white text-center"
                  style={{
                    fontSize: '70px',
                    margin: 0,
                    fontFamily: 'Georgia, serif', // Georgia for an elegant look
                    fontWeight: 'bold',
                    letterSpacing: '2px',
                  }}
                >
                  {name.charAt(0)}
                </p>
              </div>
            </Col>

            {/* Name as a separate row */}
            <Col md={8}>
              <Row className="mb-3 text-left text-md-left">
                <Col md={7}>
                  <h3 className="mb-0">{name}</h3>
                </Col>
                <Col md={5}>
                  <Badge
                    bg={role === 'admin' ? 'danger' : role === 'manager' ? 'warning' : 'secondary'}
                    className="py-2 px-4 align-middle"
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Badge>
                </Col>
              </Row>

              <Card.Subtitle className="mb-3 text-muted text-left text-md-left">@{username}</Card.Subtitle>

              {/* Grid layout for details */}
              <Row className="mt-2">
                <Col xs={6} className="text-left text-md-left">
                  <strong>Manager ID:</strong>
                </Col>
                <Col xs={6} className="text-left text-md-left">
                  {managerID}
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xs={6} className="text-left text-md-left">
                  <strong>Store:</strong>
                </Col>
                <Col xs={6} className="text-left text-md-left">
                  {storeMap.find(store => store.storeID === parseInt(storeID))?.name}
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xs={6} className="text-left text-md-left">
                  <strong>Email:</strong>
                </Col>
                <Col xs={6} className="text-left text-md-left">
                  {email}
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
