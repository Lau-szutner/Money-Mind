import React from 'react';
import { FormEvent, useState } from 'react';

interface CommentComposerProps {
  placeholder: string;
  buttonLabel: string;
  cancelLabel?: string;
  onSubmit: (body: string) => Promise<void>;
  onCancel?: () => void;
}

export const CommentComposer = ({
  placeholder,
  buttonLabel,
  cancelLabel = 'Cancelar',
  onSubmit,
  onCancel,
}: CommentComposerProps) => {
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedBody = body.trim();
    if (!trimmedBody || submitting) return;

    setSubmitting(true);
    setError(null);
    try {
      await onSubmit(trimmedBody);
      setBody('');
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'No se pudo publicar el comentario',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (submitting) return;
    setBody('');
    setError(null);
    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={body}
        onChange={(event) => setBody(event.target.value)}
        disabled={submitting}
        maxLength={2000}
        rows={3}
        placeholder={placeholder}
        className="w-full resize-y rounded-lg border border-neutral-700 bg-neutral-900 p-3 text-sm text-white placeholder-gray-400 focus:border-greenIn focus:outline-none"
      />
      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
      <div className="flex items-center justify-between gap-3">
        {/* <span className="text-xs text-gray-400">{body.length}/2000</span> */}
        <div className="gap-5 grid w-full md:flex text-white">
          <button
            type="submit"
            disabled={!body.trim() || submitting}
            className="rounded-md bg-greenIn px-4 py-2 text-sm font-semibold  w-full hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? 'Publicando...' : buttonLabel}
          </button>
          <button
            type="button"
            disabled={submitting}
            className="rounded-md bg-redSpend px-4 py-2 text-sm font-semibold  hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer w-full "
            onClick={handleCancel}
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </form>
  );
};
