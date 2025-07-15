// 동물 입양 게시판 api

import api from "./api";
// 전체 글 목록 출력 findAllAdoption @GetMapping("/api/adoptions/all-list")
export const findAllAdoption = (pageno = 1, pagesize = 12) => api.get(`/api/adoptions/all-list?pageno=${pageno}&pagesize=${pagesize}`)

// 지역별 글 목록 출력 findAllAdoptionByACity @GetMapping("/api/adoptions/city-list")
export const findAllAdoptionByACity = (acity, pageno = 1, pagesize = 12) => api.get(`/api/adoptions/city-list?aCity=${acity}&pageno=${pageno}&pagesize=${pagesize}`)

// 관심 등록 + 관심 취소 addOrRemoveWish @PostMapping("/api/adoptions/wish") (username은 principal로 자동으로 가져와서 안적어도됨)
export const addOrRemoveWish = (ano) => api.post(`/api/adoptions/wish?ano=${ano}`)

// 글 작성 writeAdoption @PostMapping(value = "/api/adoptions/write")
export const writeAdoption = (object) => api.post(`/api/adoptions/write`, object)

// 글 읽기 findAdoptionByAno @GetMapping("/api/adoptions/adoption")
export const findAdoptionByAno = (ano) => api.get(`/api/adoptions/adoption?ano=${ano}`)

// 글 수정 updateAdoption @PutMapping("/api/adoptions/adoption")
export const updateAdoption = (object) => api.put(`/api/adoptions/adoption`, object)

// 글 삭제 deleteAdoptionByAno @DeleteMapping("/api/adoptions/adoption")
export const deleteAdoptionByAno = (ano) => api.delete(`/api/adoptions/adoption?ano=${ano}`)

