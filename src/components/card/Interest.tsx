import kebabMenuIcon from "@/assets/icons/kebab-menu-32.svg";
import personIcon from "@/assets/icons/person.svg";
import checkIcon from "@/assets/icons/check-default.svg";
import Button from "../common/button/Button";
import { useEffect, useRef, useState } from "react";
import type { InterestId } from "@/types/ids";
import Dropdown from "../dropdown";
import { useClosePopup } from "@/shared/hooks/useClosePopup";

interface InterestProps {
  interestId: InterestId;
  name: string;
  keywords: string[];
  subscriberCount: number;
  isSubscribed?: boolean;
  onSubscribeClick: (id: InterestId, isSubscribed: boolean) => void;
  onEditKeyword: (id: InterestId) => void;
  onSaveKeyword: (id: InterestId, keywordText: string) => void;
  onCancelKeyword: () => void; //키워드 수정 취소
  onDeleteInterest: (id: InterestId) => void;
}

export default function Interest({
  interestId,
  name,
  keywords,
  subscriberCount,
  isSubscribed = false,
  onSubscribeClick,
  onEditKeyword,
  onSaveKeyword,
  onCancelKeyword,
  onDeleteInterest,
}: InterestProps) {
  const [isSubscribe, setIsSubscribe] = useState(isSubscribed);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [keywordText, setKeywordText] = useState("");
  const dropdownRef = useRef<HTMLButtonElement>(null);

  useClosePopup(dropdownRef, () => setIsDropdownOpen(false), isDropdownOpen);

  // 편집 시작시 현재 키워드들을 텍스트로 설정하기
  useEffect(() => {
    if (isEditing) {
      setKeywordText(keywords.join(", "));
    }
  }, [isEditing, keywords]);

  const handleSubScribeClick = () => {
    setIsSubscribe(!isSubscribe);
    onSubscribeClick(interestId, !isSubscribe);
  };

  const handleDropdownChange = (selectedItem: string) => {
    if (selectedItem === "키워드 수정") {
      setIsEditing(true);
      onEditKeyword(interestId);
    } else if (selectedItem === "관심사 삭제") {
      onDeleteInterest(interestId);
    }
    setIsDropdownOpen(false); //메뉴선택시 드롭다운 닫히게
  };

  const handleKeywordSave = () => {
    onSaveKeyword(interestId, keywordText);
    setIsEditing(false);
  };

  const handleKeywordCancel = () => {
    onCancelKeyword();
    setIsEditing(false);
    setKeywordText("");
  };

  return (
    <div className="w-full h-auto border border-slate-200 rounded-2xl p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-20-b text-slate-900">{name}</h2>
        <button
          className="relative"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef}
        >
          <img src={kebabMenuIcon} className="w-8 h-8" alt="케밥" />
          {isDropdownOpen && (
            <Dropdown
              items={["키워드 수정", "관심사 삭제"]}
              onChange={handleDropdownChange}
              className="right-0 top-7 z-10 min-w-32"
            />
          )}
        </button>
      </div>
      {isEditing ? (
        <div className="mb-6">
          <textarea
            value={keywordText}
            onChange={(e) => setKeywordText(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg resize-none"
            rows={3}
            placeholder="키워드를 쉼표(,)로 구분해서 입력하세요"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleKeywordSave}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              저장
            </button>
            <button
              onClick={handleKeywordCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 mb-6">
          {keywords.map((keyword, index) => (
            <div
              key={index}
              className="rounded-lg py-1 px-2 bg-slate-100 text-16-m text-slate-500"
            >
              {keyword}
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center">
          <img src={personIcon} className="w-6 h-6" alt="사람모양" />
          <span className="text-14-r text-slate-500">
            {subscriberCount} 구독자
          </span>
        </div>
        {isSubscribe ? (
          <Button
            variant="secondary"
            size="sm"
            className="flex gap-1 min-w-[91px]"
            onClick={handleSubScribeClick}
          >
            <img src={checkIcon} className="w-4 h-4" alt="체크" />
            구독 중
          </Button>
        ) : (
          <Button
            className="min-w-[80px]"
            size="sm"
            onClick={handleSubScribeClick}
          >
            구독하기
          </Button>
        )}
      </div>
    </div>
  );
}
