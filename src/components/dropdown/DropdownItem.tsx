interface DropdownItemProps {
  label: string;
  onClick: () => void;
}

export default function DropdownItem({ label, onClick }: DropdownItemProps) {
  return (
    <li
      className={`h-11 p-3 gap-0.5 bg-white font-pretendard font-medium text-sm leading-5 hover:bg-slate-100`}
      onClick={onClick}
    >
      <span>{label}</span>
    </li>
  );
}
