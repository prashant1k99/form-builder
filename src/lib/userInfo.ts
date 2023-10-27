import { Navigate } from "react-router-dom";

export default function UserInfo() {
  const userInfoInStorage = localStorage.getItem('user': Firebase);
  if (!userInfoInStorage) {
    return Navigate({ to: '/login' });
  }
  const user = JSON.parse(userInfoInStorage);
  return user;
}