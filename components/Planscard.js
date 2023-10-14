import React from 'react';

const Planscard = ({ title, _description, _ipfsHash, _prices, buttonText }) => {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <p className="card-content text-justify">{_description}</p>
      <p className="card-content">{_ipfsHash}</p>
      <p className="card-content">Price: {_prices} eth</p>
      <button className="card-button">Purchase</button>
    </div>
  );
};

export default Planscard;
