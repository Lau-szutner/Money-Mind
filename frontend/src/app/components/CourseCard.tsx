// CourseCard.tsx
import React from 'react';

interface CourseData {
  title: string;
  author: string;
  description: string;
  price: number;
  topics: string[];
}

const CourseCard: React.FC<CourseData> = (props) => {
  return (
    <div className="bg-bgComponents p-7 flex flex-col w-3/12 gap-5 rounded-lg">
      <img src="https://picsum.photos/200/130" alt="" className="rounded-lg" />
      <h3 className="text-2xl font-bold">{props.title}</h3>
      <p className="text-2xl font-medium">{props.author}</p>
      <p className="text-1xl">{props.description}</p>
      <ul className="flex gap-2 font-semibold text-2xl">
        {props.topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
      <p className="text-3xl font-bold">{props.price}</p>
    </div>
  );
};

export default CourseCard;
