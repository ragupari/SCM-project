import React from 'react';
import './Style.css';

function BoxComponent({ title }) {
  return (
    <div className="my-2 mx-2 p-5 border bg-light background">
      <h1 className="card-font">{title}</h1>
    </div>
  );
}
export default BoxComponent;
