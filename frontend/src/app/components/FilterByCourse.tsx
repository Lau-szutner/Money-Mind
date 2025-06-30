import React from 'react';

const FilterByCourse: React.FC = () => {
  const Topic = [
    'Saving',
    'Stocks',
    'Personal Economy',
    'Taxes',
    'Begginer',
    'With certificate',
    'Most rated',
    'New releases',
  ];

  const Duration = [
    '0-1 Hour',
    '1-3 Hours',
    '3-6 Hours',
    '6-12 Hours',
    '12-24 Hours',
    '24+ Hours',
  ];

  const Price = ['Paid', 'Free'];

  return (
    <div className="bg-blue-500 h-full">
      <h2>Filter by</h2>
      <ul>
        <h3>Topic</h3>
        {Topic.map((t, index) => (
          <li>{t}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilterByCourse;
