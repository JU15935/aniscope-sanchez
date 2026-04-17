interface FilterChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export function FilterChip({ label, selected, onToggle }: FilterChipProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        rounded-full border px-3 py-1 text-xs font-medium
        transition-all duration-150 cursor-pointer
        ${
          selected
            ? 'border-purple-500 bg-purple-600/30 text-purple-200'
            : 'border-gray-600 bg-gray-800 text-gray-400 hover:border-gray-400 hover:text-gray-200'
        }
      `}
    >
      {label}
    </button>
  );
}