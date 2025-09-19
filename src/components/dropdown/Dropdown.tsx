import DropdownItem from "./DropdownItem";

interface DropdownProps {
  items: string[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function Dropdown({
  items,
  value,
  onChange,
  className,
}: DropdownProps) {
  const handleSelect = (item: string) => {
    onChange(item);
  };

  return (
    <div
      className={`w-24 box-border bg-white border border-gray-200 rounded-lg overflow-hidden ${className}`}
    >
      <ul className={`w-24 py-1 max-h-60 overflow-y-auto`}>
        {items.map((item, index) => (
          <DropdownItem
            key={index}
            label={item}
            isSelected={item === value}
            onClick={() => handleSelect(item)}
          />
        ))}
      </ul>
    </div>
  );
}
