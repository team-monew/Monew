import Button from "../button/Button";
import ModalLayout from "./ModalLayout";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  cancelText = "취소",
  confirmText = "확인",
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <div className="w-[400px] p-6">
        <h2 className="text-20-b text-slate-900 mb-4">{title}</h2>
        <p className="text-16-r text-slate-600 mb-8">{message}</p>

        <div className="flex gap-3 justify-end">
          <Button
            variant="secondary"
            onClick={onClose}
            className="min-w-[80px] flex-1"
          >
            {cancelText}
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            className="min-w-[80px] flex-1"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
}
