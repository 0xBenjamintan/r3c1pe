import React from "react";

import Planscard from "@/components/Planscard";

const plans = () => {
  const cardsData = [
    {
      title: "Silver Package",
      _description:
        "Silver Package provides basic Advertising strategy that economically provide marketing value towards the consumers",
      _cpaOffer: "1",
      _ipfsHash: "0x123456789abcdef",
      _prices: "0.005",
    },
    {
      title: "Gold Package",
      _description:
        "Gold Package provides intermediate Advertising strategy that economically provide marketing value towards the consumers",
      _cpaOffer: "0.10",
      _ipfsHash: "2231",
      _prices: "0.01",
    },
    {
      title: "Diamond Package",
      _description:
        "Diamond Package provides advanced and complete Advertising strategy that potentially provide the largest value towards the consumers",
      _cpaOffer: "0.20",
      _ipfsHash: "3231",
      _prices: "0.02",
    },
  ];

  return (
    <main>
      <div className="mt-8 mb-6 text-center">
        <h1 className="font-bold text-3xl">Our Packages</h1>
      </div>
      <div className="w-full flex">
        {cardsData.map((data, index) => (
          <Planscard
            key={index}
            title={data.title}
            _description={data._description}
            _cpaOffer={data._cpaOffer}
            _prices={data._prices}
            _ipfsHash={data._ipfsHash}
          />
        ))}
      </div>
    </main>
  );
};

export default plans;
