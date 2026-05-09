import React from 'react';

const SearchBy = () => {
  return (
    <div className="w-full">
      <div className="h-fit w-full p-5 bg-bgComponents rounded-xl">
        <input
          type="text"
          placeholder="Search on MoneyMind"
          className="bg-bgComponents placeholder-white text-2xl"
        />
      </div>
    </div>
  );
};

export default SearchBy;
