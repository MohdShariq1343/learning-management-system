export const apiUrl  = import.meta.env.VITE_API_URL;

const userInfo = localStorage.getItem('userInfoLms')

export const token  = userInfo ? JSON.parse(userInfo).token : null

export const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
});