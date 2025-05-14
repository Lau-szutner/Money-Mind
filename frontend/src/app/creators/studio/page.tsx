// app/education/page.tsx

export default function Studio() {
  return (
    <main className="min-h-screen p-8 bg-neutral-950 text-white">
      <h1 className="text-3xl font-bold mb-6">Studio</h1>

      <form action="" method="post" className="flex flex-col gap-4 max-w-xl">
        {[
          { name: 'title', placeholder: 'Title' },
          { name: 'Description', placeholder: 'Description' },
          { name: 'ShorDescription', placeholder: 'Short Description' },
          { name: 'FrontPage', placeholder: 'Front Page (URL o texto)' },
        ].map((field) => (
          <label key={field.name} className="flex flex-col gap-1">
            {field.name}
            <input
              type="text"
              name={field.name}
              placeholder={field.placeholder}
              className="px-4 py-2 rounded-md bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        ))}

        <label
          htmlFor="videoInput"
          className="border-2 border-dashed border-neutral-600 p-6 rounded-lg text-center cursor-pointer hover:bg-neutral-800 transition-colors"
        >
          Arrastrá un video o hacé clic para subir
          <input id="videoInput" type="file" accept="video/*" hidden />
        </label>
      </form>
    </main>
  );
}
