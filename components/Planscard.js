import React from "react";
import { useContractWrite } from "wagmi";
import { ethGoerliAbi } from "../lib/abiAdsRegister.js";

const Planscard = ({
  title,
  _description,
  _ipfsHash,
  _advertisementdapp,
  _prices,
  _cpaOffer,
  buttonText,
}) => {
  const { write } = useContractWrite({
    address: "0xF8431b7B6Bd716e425b57181d15AEFeF695de184",
    abi: ethGoerliAbi,
    functionName: "registerAd",
    args: [_description, parseFloat(_cpaOffer) * Math.pow(10, 18), _ipfsHash],
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
      <p className="card-content text-justify h-20">
        <span className="font-bold">dApp supported: </span>
        {_advertisementdapp}{" "}
      </p>
      <p className="card-content">Price: {_prices} eth</p>
      <button className="card-button" onClick={() => write()}>
        Purchase
      </button>
    </div>
  );
};

export default Planscard;
