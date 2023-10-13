import React from 'react';

const Planscard = ({ title, content, buttonText }) => {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <p className="card-content">{content}</p>
      <button className="card-button">{buttonText}</button>
    </div>
  );
};

export default Planscard;
