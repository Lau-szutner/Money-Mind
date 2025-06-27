import React from 'react';

interface Props {
  title: string;
  //   autor: string;
  //   description: string;
  //   topics: [];
  //   price: number;
}

const Course: React.FC<Props> = ({ title }) => {
  return (
    <div className="w-full p-5">
      <div className="h-5 w-5 bg-blue-500"></div>
      <div className="bg-bgComponents p-5 rounded-lg m-5 text-2xl h-fit">
        <h2 className="font-bold text-3xl border-b-2">Course</h2>
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default Course;
