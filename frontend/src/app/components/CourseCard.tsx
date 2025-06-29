// CourseCard.tsx
import React from 'react';
import Image from 'next/image';

// Creo una interfaz para definir la forma de los datos que recibirá el curso.
interface CourseData {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  topics: string[];
}

// Defino CourseCard como un React Functional Component que usa la interfaz CourseData.
// Gracias a esto, las props deben cumplir con la forma definida en la interfaz.
// Además, desestructuro las props directamente para usarlas de forma más clara.
const CourseCard: React.FC<CourseData> = ({
  id,
  title,
  author,
  description,
  price,
  topics,
}) => {
  return (
    <div className="bg-bgComponents p-7 flex flex-col w-3/12 gap-5 rounded-lg align-center">
      <Image
        src={`/courses/image-${id}.png`}
        alt="123"
        width="400"
        height="350"
        className="rounded-md"
      ></Image>

      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-2xl font-medium">{author}</p>
      <p className="text-1xl">{description}</p>
      <ul className="flex gap-2 font-semibold text-2xl">
        {/* {topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))} */}
      </ul>
      <p className="text-3xl font-bold">${price}</p>
    </div>
  );
};

export default CourseCard;
