import api from "./api";

// 일반 멤버 마이페이지 링크
export const normalMyPage = (username) => api.get(`/nuser?username=${username}`)

// 병원 멤버 마이페이지 링크
export const hospitalMyPage = (username) => api.get(`/hospital?username=${username}`)

// 일반 회원 회원 탈퇴
export const Ndelete = (nname) => api.post(`/api/nuser?username=${nname}`)