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
    <div className="bg-bgComponents h-full p-7">
      <div>
        <h2 className="border-b-4 border-indigo-600 text-xl">Filter by</h2>
        <div className="border-b-4 border-indigo-600">
          <h3>Topic</h3>
          <ul>
            {Topic.map((t, index) => (
              <li>{t}</li>
            ))}
          </ul>
        </div>

        <div className="border-b-4 border-indigo-600">
          <h3>Duration</h3>
          <ul>
            {Duration.map((t, index) => (
              <li>{t}</li>
            ))}
          </ul>
        </div>

        <div className="border-b-4 border-indigo-600">
          <h3>Price</h3>

          <ul>
            {Price.map((t, index) => (
              <li>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterByCourse;
