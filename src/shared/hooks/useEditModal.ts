import { useState } from "react";

type UUID = `${string}-${string}-${string}-${string}-${string}`; // 머지되면 바꿀게요

type UserId = UUID; // 머지되면 바꿀게요

export default function useEditModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [editUser, setEditUser] = useState<UserId | undefined>();

  const openModal = (user: UserId) => {
    setEditUser(user);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, onClose: closeModal, initialData: editUser };
}
