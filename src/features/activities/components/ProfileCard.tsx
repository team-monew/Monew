import { useAuthInfo } from "@/features/auth/hooks/useAuthInfo"

export default function ProfileCard() {
const {userName, userEmail} = useAuthInfo()

    return (
        <div className="flex flex-col w-full max-w-[260px] min-h-[100px] bg-white rounded-4 p-6">
            <p className="text-18-sb text-black">{userName}</p>
            <span className="text-16-r text-gray-500">{userEmail}</span>
        </div>
    )
}