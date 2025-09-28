import EditIconUrl from "@/assets/icons/edit.svg"

export default function EditProfileButton() {
    return (
<button type="button" aria-label="닉네임 수정">
    <img src={EditIconUrl} alt=""/>
</button>
    )
}