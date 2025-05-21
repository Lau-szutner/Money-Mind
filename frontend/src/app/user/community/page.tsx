// app/education/community.tsx
import Post from './components/Post';
export default function community() {
  return (
    <main className="min-h-screen p-8 bg-neutral-950 text-white">
      <h1 className="text-4xl font-bold mb-4">Community</h1>

      <div className="flex gap-5">
        <div className="h-50 bg-blue-500 p-5 rounded-md w-11/12 gap-5">
          Search
        </div>
        <button className="w-1/12 bg-gray-500 rounded-md">+</button>
      </div>

      <Post user="Lautaro"></Post>
    </main>
  );
}
