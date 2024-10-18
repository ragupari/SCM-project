import React from 'react';
import { Card } from 'react-bootstrap';

const TopCards = (props) => {
  return (
    <Card>
      <Card.Body>
        <div className="d-flex align-items-center">
          <div className={`circle-box lg-box d-inline-block ${props.bg}`}>
            <i className={props.icon}></i>
          </div>
          <div className="ms-3">
            <h5 className="mb-0 font-weight-bold">{props.earning}</h5>
            <small className="text-muted">{props.subtitle}</small>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TopCards;
