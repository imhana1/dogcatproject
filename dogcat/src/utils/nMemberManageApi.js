// 일반유저 api (다 get)

import api from "./api";

// 전체 목록 출력 findAllNormalMember /api/n-members/list
export const findAllNormalMember = (pageno= 1, pagesize = 20) => api.get(`/api/n-members/list?pageno=${pageno}&pagesize=${pagesize}`)

// 상태에 따른 목록 출력 findAllNormalMemberByStatus /api/n-members/status-list
// * status로 하니까 n member list에서 status를 react router dom의 status라고 인식해서 프론트에서 사용하는 이름 변경
export const findAllNormalMemberByStatus = (memberStatus, pageno = 1, pagesize = 20) => api.get(`/api/n-members/status-list?status=${memberStatus}&pageno=${pageno}&pagesize=${pagesize}`)

// 검색에 따른 목록 출력 findNormalMemberByWord /api/n-members/search-list
export const findNormalMemberByWord = (searchType, searchWord, pageno = 1, pagesize = 20) => api.get(`/api/n-members/search-list?searchType=${searchType}&searchWord=${searchWord}&pageno=${pageno}&pagesize=${pagesize}`)

// 회원 상세보기 findNormalMemberByUsername /api/n-members/n-member
export const findNormalMemberByUsername = (username) => api.get(`/api/n-members/n-member?username=${username}`)

// 경고횟수 증감과 차단 및 차단해제는 일반/병원이 겹쳐서 컨트롤러랑 이름을 다르게 함

// 경고횟수 1회 증가 incWarningCount /api/n-members/inc
export const nIncWarningCount = (username) => api.get(`/api/n-members/inc?username=${username}`)

// 경고횟수 1회 감소 decWarningCount /api/n-members/dec
export const nDecWarningCount = (username) => api.get(`/api/n-members/dec?username=${username}`)

// 차단 blockOn /api/n-members/block-on
export const nBlockOn = (username) => api.get(`/api/n-members/block-on?username=${username}`)

// 차단 해제 blockOff /api/n-members/block-off
export const nBlockOff = (username) => api.get(`/api/n-members/block-off?username=${username}`)