import React from 'react';

function NewIncome() {
  return (
    <div>
      <div className="">
        <div className="bg-bgComponents p-5 rounded-lg m-5">
          <h1 className="font-bold text-center">New spend</h1>
          <div className="gap-2 mt-2">
            <form action="" className="flex flex-col gap-2">
              <input
                type="text"
                className="p-1 rounded w-full text-gray-500 text-center"
                placeholder="Category"
                name="Category"
              />

              <input
                type="number"
                className="p-1 rounded w-full text-gray-500 text-center"
                placeholder="Amount"
                name="Amount"
              />
              <button className="py-1 px-10 bg-redSpend rounded w-full font-semibold">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewIncome;
