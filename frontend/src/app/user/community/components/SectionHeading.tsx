// MARK: Heading section
interface SectionHeadingProps {
  title: string;
  expanded: boolean;
  controlsId: string;
  onToggle: () => void;
}

export const SectionHeading = ({
  title,
  expanded,
  controlsId,
  onToggle,
}: SectionHeadingProps) => (
  <div className="flex items-center justify-between">
    <p className="font-bold text-heading-sm">{title}</p>
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-controls={controlsId}
      className="cursor-pointer rounded px-2 py-1 text-sm text-gray-400 hover:text-greenIn focus-visible:outline-2 focus-visible:outline-greenIn"
    >
      {expanded ? 'Ocultar' : 'Mostrar'}
    </button>
  </div>
);
