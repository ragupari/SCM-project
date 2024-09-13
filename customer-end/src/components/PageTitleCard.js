import React from 'react';
import './Style.css';

function BoxComponent({ title }) {
  return (
    <div className="p-3 border bg-light background">
      <h1 className="card-font">{title}</h1>
    </div>
  );
}
export default BoxComponent;
