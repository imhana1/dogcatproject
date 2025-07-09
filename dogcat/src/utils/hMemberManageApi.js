// 병원 유저 api (다 get)

import api from "./api";

// 전체 목록 출력 findAllHospitalMember /api/h-members/list
export const findAllHospitalMember = (pageno=1, pagesize=20) => api.get(`/api/h-members/list?pageno=${pageno}&pagesize=${pagesize}`)

// 상태에 따른 목록 출력 findAllHospitalMemberByStatus /api/h-members/status-list
export const findAllHospitalMemberByStatus = (memberStatus, pageno=1, pagesize=20) => api.get(`/api/h-members/status-list?status=${memberStatus}&pageno=${pageno}&pagesize=${pagesize}`)

// 검색에 따른 목록 출력 findHospitalMemberByWord /api/h-members/search-list
export const findHospitalMemberByWord = (searchType, searchWord, pageno=1, pagesize=20) => api.get(`/api/h-members/search-list?searchType=${searchType}&searchWord=${searchWord}&pageno=${pageno}&pagesize=${pagesize}`)

// 회원 상세보기 findHospitalMemberByUsername /api/h-members/h-member
export const findHospitalMemberByUsername = (username) => api.get(`/api/h-members/h-member?username=${username}`)

// 경고횟수 1회 증가 incWarningCount /api/h-members/inc
export const hIncWarningCount = (username) => api.get(`/api/h-members/inc?username=${username}`)

// 경고횟수 1회 감소 decWarningCount /api/h-members/dec/dec
export const hDecWarningCount = (username) => api.get(`/api/h-members/dec/dec?username=${username}`)

// 차단 blockOn /api/h-members/block-on
export const hBlockOn = (username) => api.get(`/api/h-members/block-on?username=${username}`)

// 차단 해제 blockOff /api/h-members/block-off
export const hBlockOff = (username) => api.get(`/api/h-members/block-off?username=${username}`)