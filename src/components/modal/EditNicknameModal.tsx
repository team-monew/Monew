import { useEffect, useState } from "react";
import Input from "@/components/Input";
import ModalLayout from "@/components/modal/ModalLayout";
import Button from "@/components/button/Button";
import type { User } from "@/api/users/types";
import type { UserId } from "@/types/ids";
import { updateUser } from "@/api/users/index";
import { authSession } from "@/features/auth/utils/authSession";
import Skeleton from "@/components/Skeleton";
import { toast } from "react-toastify";

interface EditNicknameModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User
  onUpdated?: (args: {
    userId: UserId;
    nickname: string;
    updatedUser: User;
  }) => void;
}

export default function EditNicknameModal({
  isOpen,
  onClose,
  user,
  onUpdated,
}: EditNicknameModalProps) {
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = nickname.trim() !== "";

  useEffect(() => {
    if (!isOpen) return;
    setNickname(user?.nickname ?? "");
  }, [isOpen, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const updatedUser = await updateUser(user.id, { nickname });
      authSession.write(updatedUser)

      onUpdated?.({ userId: user.id, nickname, updatedUser });
      toast.success("닉네임이 수정되었습니다.");
      onClose();
    } catch (error) {
      console.error("error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[438px] h-auto gap-10"
      >
        <h2 className="text-24-sb mb-10">닉네임 수정</h2>
        <Input
          label="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="mb-12"
          disabled={isSubmitting}
        />

        <Button
          className="w-full"
          disabled={!isFormValid || isSubmitting}
          type="submit"
        >
          {isSubmitting ? <Skeleton /> : "수정하기"}
        </Button>
      </form>
    </ModalLayout>
  );
}
