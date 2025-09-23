import chevronDown from "@/assets/icons/chevron-down-16.svg";
import { useEffect, useRef, useState } from "react";
import Dropdown from "./dropdown";

interface SelectBarProps {
  placeholder?: string;
  items: string[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function SelectBox({
  placeholder = "선택하세요",
  items,
  value,
  onChange,
  className = "w-full h-10",
}: SelectBarProps) {
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
      <button
        type="button"
        className={`border rounded-lg border-slate-200 py-2.5 px-3 bg-white cursor-pointer w-full h-full focus:outline-none`}
        onClick={handleSelectBarClick}
      >
        <div className="flex justify-between items-center">
          <p
            className={`text-14-m ${!value ? "text-slate-400" : "text-gray-900"}`}
          >
            {value || placeholder}
          </p>
          <img
            src={chevronDown}
            className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            alt="chevron"
          />
        </div>
      </button>

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
