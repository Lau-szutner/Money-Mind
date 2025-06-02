'use client';

import { useState } from 'react';

interface NewPostModalProps {
  onClose: () => void;
  onSubmit: (data: { title: string; body: string }) => void;
}

const NewPostModal = ({ onClose, onSubmit }: NewPostModalProps) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, body });
    onClose(); // cerrar modal después de enviar
  };

  return (
    <div className="h-100 w-full bg-background p-5 rounded-md">
      <h2 className="text-xl font-bold mb-4">Crear nuevo post</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded text-black"
          required
        />

        <textarea
          name="body"
          placeholder="Contenido"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="p-2 rounded text-black"
          required
        />

        <div className="flex justify-between">
          <button type="submit" className="bg-green-600 px-4 py-2 rounded">
            Publicar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPostModal;
