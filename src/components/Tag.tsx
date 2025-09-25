interface TagProps {
  label: string;
  onClick?: () => void;
}

export default function Tag({ label, onClick }: TagProps) {
  return (
    <div className={`w-fit h-8 px-2 py-1 gap-2 rounded-lg bg-slate-100`}>
      <p
        className={` font-pretendard font-medium text-base leading-6 text-slate-500`}
        onClick={onClick}
      >
        {label}
      </p>
    </div>
  );
}
