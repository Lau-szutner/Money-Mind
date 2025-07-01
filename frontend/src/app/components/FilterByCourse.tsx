import React, { useState } from 'react';

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

  const [topicFilters, setTopicFilters] = useState<boolean[]>(
    Array(Topic.length).fill(false)
  );

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
    <div className="bg-bgComponents h-full p-7 rounded-xl">
      <div>
        <h2 className="text-3xl font-bold pb-5">Filter by</h2>
        <div>
          <h3 className="text-2xl border-b-2 border-white font-bold">Topic</h3>
          <ul className="p-4 flex flex-col gap-4">
            {Topic.map((t, index) => (
              <div className="flex justify-between" key={t}>
                <li className="text-2xl">{t}</li>
                <button
                  onClick={() => {
                    const newFilters = [...topicFilters];
                    newFilters[index] = !newFilters[index];
                    setTopicFilters(newFilters);
                  }}
                  className={`w-8 h-8 rounded-full ${
                    topicFilters[index]
                      ? 'bg-greenIn circle-shadow-green'
                      : 'bg-redSpend circle-shadow-red'
                  }`}
                ></button>
              </div>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-2xl border-b-2 border-white font-bold">
            Duration
          </h3>
          <ul className="p-4 flex flex-col gap-4">
            {Duration.map((t, index) => (
              <div className="flex justify-between" key={t}>
                <li className="text-2xl">{t}</li>
                <div className="w-8 h-8 rounded-full bg-redSpend circle-shadow-red"></div>
              </div>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-2xl border-b-2 border-white font-bold">Price</h3>
          <ul className="p-4 flex flex-col gap-4">
            {Price.map((t, index) => (
              <li className="p-1" key={t}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterByCourse;
