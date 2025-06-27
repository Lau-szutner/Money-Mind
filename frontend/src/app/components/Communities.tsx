import React from 'react';

interface Props {
  communities: String;
}

const Communities: React.FC<Props> = () => {
  return (
    <div className="w-3/12 bg-bgComponents p-5 text-3xl">
      <h2>Communities</h2>
      <ul className="text-xl">
        <li>Hola</li>
        <li>Hola</li>
        <li>Hola</li>
        <li>Hola</li>
        <li>Hola</li>
      </ul>
    </div>
  );
};

export default Communities;
