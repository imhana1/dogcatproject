// 동물 입양 게시판 api

import api from "./api";
// 전체 글 목록 출력 findAllAdoption @GetMapping("/api/adoptions/all-list")
export const findAllAdoption = () => api.get('/api/adoptions/all-list')

// 지역별 글 목록 출력 findAllAdoptionByACity @GetMapping("/api/adoptions/city-list")

// 관심 등록 + 관심 취소 addOrRemoveWish @PostMapping("/api/adoptions/wish")

// 글 작성 writeAdoption @PostMapping(value = "/api/adoptions/write")

// 글 읽기 findAdoptionByAno @GetMapping("/api/adoptions/adoption")

// 글 수정 updateAdoption @PutMapping("/api/adoptions/adoption")

// 글 삭제 deleteAdoptionByAno @DeleteMapping("/api/adoptions/adoption")

