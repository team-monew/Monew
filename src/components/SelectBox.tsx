import chevronDown from "@/assets/icons/chevron-down-16.svg";
import { useEffect, useRef, useState } from "react";
import Dropdown from "./dropdown";

interface selectBarProps {
  width: string;
  height: string;
  placeholder?: string;
  items: string[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function SelectBox({
  width,
  height,
  placeholder = "선택하세요",
  items,
  value,
  onChange,
  className,
}: selectBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectBarClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      <div
        className={`${width} ${height} border rounded-lg border-slate-200 py-2.5 px-3 gap-2 bg-white cursor-pointer`}
        onClick={handleSelectBarClick}
      >
        <div className="flex justify-between items-center">
          <p
            className={`font-pretendard font-medium text-sm leading-5 ${!value ? "text-slate-400" : "text-gray-900"}`}
          >
            {value || placeholder}
          </p>
          <img
            src={chevronDown}
            className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            alt="chevron"
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-10">
          <Dropdown
            items={items}
            onChange={handleItemSelect}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}
