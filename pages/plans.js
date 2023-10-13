import React from 'react';
import Planscard from '@/components/Planscard';

const plans = () => {
  const cardsData = [
    {
      title: 'Card 1',
      content: 'This is the content for card 1.',
      buttonText: 'Button 1',
    },
    {
      title: 'Card 2',
      content: 'This is the content for card 2.',
      buttonText: 'Button 2',
    },
    {
      title: 'Card 3',
      content: 'This is the content for card 3.',
      buttonText: 'Button 3',
    },
  ];

  return (
    <main>
      <div>
        Plans
      </div>
    <div className='w-full flex'>
      {cardsData.map((data, index) => (
        <Planscard
          key={index}
          title={data.title}
          content={data.content}
          buttonText={data.buttonText}
        />
      ))}
    </div>
    </main>
  );
};

export default plans;
