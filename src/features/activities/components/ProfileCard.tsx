import { useAuthInfo } from "@/features/auth/hooks/useAuthInfo"
import EditProfileButton from "./EditProfileButton"

export default function ProfileCard() {
const {userName, userEmail} = useAuthInfo()

    return (
        <div className="flex flex-col w-full max-w-[260px] min-h-[100px] bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex w-full gap-1.5">
            <p className="text-18-sb text-black">{userName}</p>
            <EditProfileButton/>
            </div>
            <span className="text-16-r text-[#9EA5B0]">{userEmail}</span>
        </div>
    )
}