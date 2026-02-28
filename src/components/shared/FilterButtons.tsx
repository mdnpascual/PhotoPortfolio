interface FilterButtonsProps {
  items: { id: string; label: string }[];
  activeId: string;
  onChange: (id: string) => void;
}

export default function FilterButtons({ items, activeId, onChange }: FilterButtonsProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {items.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            id === activeId
              ? "bg-white text-black"
              : "border border-white/50 text-white hover:border-white"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
