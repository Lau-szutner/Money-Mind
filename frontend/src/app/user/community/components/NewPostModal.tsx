'use client';

import { useEffect, useState } from 'react';
import { CommunityBasic } from '@/app/types/types';

interface NewPostModalProps {
  onClose: () => void;

  onSubmit: (data: {
    title: string;
    body: string;
    fk_community_id: number;
    post_type: 'text' | 'link' | 'image' | 'video';
    url?: string;
  }) => void;
  communities: CommunityBasic[];
}

const NewPostModal = ({
  onClose,
  onSubmit,
  communities,
}: NewPostModalProps) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [communityId, setCommunityId] = useState<number>(
    communities[0]?.id || 0,
  );
  const [postType, setPostType] = useState<'text' | 'link' | 'image' | 'video'>(
    'text',
  );
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (communities.length > 0) {
      setCommunityId((currentId) =>
        currentId !== 0 ? currentId : communities[0].id,
      );
    }
  }, [communities]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!title.trim()) newErrors.push('El título es obligatorio');
    if (!communityId) newErrors.push('Debes seleccionar una comunidad');
    if (postType !== 'text' && !body.trim() && !url) {
      newErrors.push('Necesitas contenido o una URL');
    }
    if (postType === 'link' && !url.trim()) {
      newErrors.push('La URL es obligatoria para posts de tipo link');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      title: title.trim(),
      body: body.trim(),
      fk_community_id: communityId,
      post_type: postType,
      url: postType === 'link' ? url.trim() : undefined,
    });
    onClose();
  };

  return (
    <div className="h-auto w-full bg-background p-5 rounded-md shadow-lg">
      <h2 className="text-xl font-bold mb-4">Crear nuevo post</h2>

      {errors.length > 0 && (
        <div className="bg-red-600 text-white p-3 rounded mb-4">
          {errors.map((error, idx) => (
            <p key={idx}>• {error}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Comunidad */}
        <div>
          <label className="text-sm font-semibold text-gray-300 block mb-1">
            Comunidad
          </label>
          <select
            value={communityId}
            onChange={(e) => setCommunityId(Number(e.target.value))}
            className="w-full p-2 rounded text-black bg-white border border-gray-300"
            required
          >
            <option value="0" disabled>
              Selecciona una comunidad
            </option>
            {communities.map((community) => (
              <option key={community.id} value={community.id}>
                {community.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tipo de Post */}
        <div>
          <label className="text-sm font-semibold text-gray-300 block mb-1">
            Tipo de post
          </label>
          <div className="flex gap-2">
            {(['text', 'link', 'image', 'video'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setPostType(type)}
                className={`px-3 py-1 rounded text-sm ${
                  postType === type
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Título */}
        <div>
          <label className="text-sm font-semibold text-gray-300 block mb-1">
            Título *
          </label>
          <input
            type="text"
            name="title"
            placeholder="¿Cuál es el tema?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded text-black"
            required
          />
        </div>

        {/* Contenido */}
        {postType === 'text' && (
          <div>
            <label className="text-sm font-semibold text-gray-300 block mb-1">
              Contenido
            </label>
            <textarea
              name="body"
              placeholder="Escribe tu post aquí..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-2 rounded text-black resize-none"
              rows={5}
            />
          </div>
        )}

        {/* URL para posts tipo link */}
        {postType === 'link' && (
          <div>
            <label className="text-sm font-semibold text-gray-300 block mb-1">
              URL del enlace *
            </label>
            <input
              type="url"
              placeholder="https://ejemplo.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2 rounded text-black"
              required
            />
            <textarea
              name="body"
              placeholder="Descripción (opcional)"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-2 rounded text-black mt-2 resize-none"
              rows={3}
            />
          </div>
        )}

        {/* Para image y video */}
        {(postType === 'image' || postType === 'video') && (
          <div className="text-yellow-400 text-sm">
            ⚠️ Esta funcionalidad aún está en desarrollo
          </div>
        )}

        {/* Botones */}
        <div className="flex justify-between gap-2">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition"
          >
            Publicar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPostModal;
