import React from "react";

import { useContractWrite } from "wagmi";
import { ethGoerliAbi } from "../lib/abi.js";

const Planscard = ({
  title,
  _description,
  _ipfsHash,
  _prices,
  _cpaOffer,
  buttonText,
}) => {
  const { write } = useContractWrite({
    address: "0x708d090B015F702f3b9c961e202d9Fa9fE81F02C",
    abi: ethGoerliAbi,
    functionName: "registerAd",
    args: [_description, parseInt(_cpaOffer), _ipfsHash],
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  return (
    <div className="card">
      <h2 className="card-title">{_description}</h2>
      <p className="card-content text-justify h-40">{title}</p>
      {/* no need to show hash vlue */}
      {/* <p className="card-content">{_ipfsHash}</p> */}
      <p className="card-content">Price: {_prices} eth</p>
      <button className="card-button" onClick={() => write()}>
        Purchase
      </button>
    </div>
  );
};

export default Planscard;
