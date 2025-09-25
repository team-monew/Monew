import { useClosePopup } from "@/shared/hooks/useClosePopup";
import { useRef } from "react";
import { createPortal } from "react-dom";

interface ModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalLayout({
  isOpen,
  onClose,
  children,
}: ModalLayoutProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useClosePopup(modalRef, onClose, isOpen);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-[502px] min-h-80 h-auto rounded-2xl p-8 gap-2.5 bg-white relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 hover:text-gray-700"
          onClick={onClose}
          aria-label="close"
        >
          x
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
