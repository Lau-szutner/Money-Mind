'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCommunity } from '@/app/services/communityServices';
import { CommunityCreate } from '@/app/types/types';

export default function NewCommunity() {
  const [formData, setFormData] = useState<CommunityCreate>({
    name: '',
    slug: '',
    description: '',
    image_url: '',
    is_private: false,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createCommunity(formData);
      router.push('/user/community');
    } catch (error: any) {
      alert('Error al crear comunidad: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid place-items-center w-full p-5">
      <div className="bg-bgComponents p-10 rounded-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-5">Crear Nueva Comunidad</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Slug (opcional)</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">URL de Imagen</label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_private"
                checked={formData.is_private}
                onChange={handleChange}
                className="mr-2"
              />
              Comunidad Privada
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-greenIn text-white p-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Creando...' : 'Crear Comunidad'}
          </button>
        </form>
      </div>
    </main>
  );
}
