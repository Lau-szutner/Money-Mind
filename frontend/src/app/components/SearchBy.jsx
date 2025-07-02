import React from 'react';

const SearchBy = () => {
  return (
    <div className="px-8">
      <div className="h-fit w-[700px] p-5 bg-bgComponents rounded-xl">
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
