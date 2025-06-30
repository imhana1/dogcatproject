import api from "./api";

// 전체리스트  * principal은 스프링이 자동으로 주입
export const findAll = (pageno = 1, pagesize = 10) => api.get(`/api/notices?pageno=${pageno}&pagesize=${pagesize}`)

// 공지사항 글읽기
export const findNoticeByNno = (nno) => api.get(`/api/api/notices?nno=${nno}`)

// 공지사항 글 작성
export const writeNotice = (object) => api.post(`/api/notices/write`, object)

// 공지사항 글 수정 (nno는 service에서 getNno()로 꺼냄)
export const updateNotice = (object) => api.put(`/api/notices/notice`, object)

// 공지사항 글 삭제
export const deleteNotice = (nno) => api.delete(`/api/notices/notice?nno=${nno}`)
