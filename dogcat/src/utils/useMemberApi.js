import api from "./api";

// 일반 멤버 마이페이지 링크
export const normalMyPage = (username) => api.get(`/nuser?username=${username}`)

// 병원 멤버 마이페이지 링크
export const hospitalMyPage = (username) => api.get(`/hospital?username=${username}`)