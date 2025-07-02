import React from 'react';

const SearchBy = () => {
  return (
    <div className="p-8">
      <div className="h-fit w-[700px] p-5 bg-bgComponents mt-5 rounded-xl">
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
