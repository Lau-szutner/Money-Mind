type Categories = {
  title: string;
};

function handleDelete() {
  console.log('Hello');
}

const Categories: React.FC<Categories> = ({ title }) => {
  return (
    <div className="p-4 bg-slate-700 m-5 rounded-md w-full flex justify-between">
      <p>{title}</p>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

export default Categories;
