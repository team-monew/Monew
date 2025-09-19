interface DropdownItemProps {
  label: string;
  onClick: () => void;
  isSelected: boolean;
}

export default function DropdownItem({
  label,
  onClick,
  isSelected,
}: DropdownItemProps) {
  return (
    <li
      className={`w-24 h-11 p-3 gap-0.5 bg-white font-pretendard font-medium text-sm leading-5 hover:bg-slate-100 ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <span>{label}</span>
    </li>
  );
}
