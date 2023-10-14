import React from "react";
import Head from "next/head";
import Planscard from "@/components/Planscard";

const plans = () => {
  const cardsData = [
    {
      title: "Silver Package provides basic Advertising strategy that economically provide marketing value towards the consumers",
      _description:
        "Silver Package",
      _cpaOffer: "0.005",
      _ipfsHash: "3123",
      _advertisementdapp: "sushiswap, kucoin",
      _prices: "0.005",
    },
    {
      title: "Gold Package provides intermediate Advertising strategy that economically provide marketing value towards the consumers",
      _description:
        "Gold Package",
      _cpaOffer: "0.100",
      _ipfsHash: "2231",
      _advertisementdapp: "sushiswap, kucoin, coinmarketcap, uniswap",
      _prices: "0.01",
    },
    {
      title: "Diamond Package provides advanced and complete Advertising strategy that potentially provide the largest value towards the consumers",
      _description:
        "Diamond Package",
      _cpaOffer: "0.200",
      _ipfsHash: "3231",
      _advertisementdapp: "sushiswap, kucoin, coinmarketcap, uniswap, coingecko, etherscan, uniswap, bybit",
      _prices: "0.02",
    },
  ];

  return (
    <main>
      <Head>
        <title>Plans</title>
      </Head>
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
            _advertisementdapp={data._advertisementdapp}
            _prices={data._prices}
            _ipfsHash={data._ipfsHash}
          />
        ))}
      </div>
    </main>
  );
};

export default plans;
