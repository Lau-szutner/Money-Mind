import React from 'react';

interface Props {
  title: string;
}

const Tracker: React.FC<Props> = ({ title }) => {
  return (
    <div className="w-full">
      <div className="bg-bgComponents p-5 rounded-lg  text-2xl h-fit">
        <h2 className="font-bold text-3xl border-b-2">Tracker</h2>
        <h2>Proximamente</h2>
      </div>
    </div>
  );
};

export default Tracker;
