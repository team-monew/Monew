import { useEffect, useState } from "react";
import Input from "../Input";
import ModalLayout from "./ModalLayout";
import Button from "../button/Button";
import type { AddInterestBody } from "@/api/interests/types";

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AddInterestBody) => void;
}

export default function UpdateModal({
  isOpen,
  onClose,
  onSave,
}: UpdateModalProps) {
  const [interestValue, setInterestValue] = useState("");
  const [keyWord, setKeyWord] = useState("");

  const isFormValid = interestValue.trim() !== "" && keyWord.trim() !== "";

  useEffect(() => {
    if (!isOpen) {
      setInterestValue("");
      setKeyWord("");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormValid) {
      onSave({
        name: interestValue,
        keywords: [keyWord],
      });
      setInterestValue("");
      setKeyWord("");
      onClose();
    }
  };

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="w-[438px] h-auto gap-10">
        <h2 className="text-24-sb mb-10">관심사 등록</h2>
        <Input
          label="관심사 이름"
          placeholder="관심사 이름을 입력해주세요"
          value={interestValue}
          onChange={(e) => setInterestValue(e.target.value)}
          className="mb-6"
        />
        <Input
          label="키워드"
          placeholder="키워드를 추가해주세요"
          value={keyWord}
          onChange={(e) => setKeyWord(e.target.value)}
          className="mb-1.5"
        />
        <p className="px-1 gap-2.5 text-14-r text-slate-500 mb-16">
          *설정한 키워드 기준으로 뉴스를 자동 수집합니다
        </p>

        <Button className="w-full" disabled={!isFormValid} type="submit">
          등록하기
        </Button>
      </form>
    </ModalLayout>
  );
}
