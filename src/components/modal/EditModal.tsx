import { useEffect, useState } from "react";
import Input from "../Input";
import ModalLayout from "./ModalLayout";
import Button from "../common/button/Button";
import type { UpdateUserBody, User } from "@/api/users/types";
import type { UserId } from "@/types/ids";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: UpdateUserBody & { userId: UserId }) => void;
  user: User;
}

export default function EditModal({
  isOpen,
  onClose,
  onSave,
  user,
}: EditModalProps) {
  const [nickname, setNickname] = useState("");

  const isFormValid = nickname.trim() !== "";

  useEffect(() => {
    if (isOpen && user) {
      setNickname(user.nickname);
    } else if (isOpen) {
      setNickname("");
    }
  }, [isOpen, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormValid && user) {
      onSave({
        userId: user.id,
        nickname,
      });
      onClose();
    }
  };

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="w-[438px] h-auto gap-10">
        <h2 className="text-24-sb mb-10">닉네임 수정</h2>
        <Input
          label="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="mb-12"
        />

        <Button className="w-full" disabled={!isFormValid} type="submit">
          수정하기
        </Button>
      </form>
    </ModalLayout>
  );
}
