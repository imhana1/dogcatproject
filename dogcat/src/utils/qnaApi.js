import api from "./api"

// 질문 전체 리스트 findAllQnaQuestion
export const findAllQnaQuestion = (pageno = 1, pagesize = 10) => api.get(`/api/qna/all-questions?pageno=${pageno}&pagesize=${pagesize}`)

// 답변 상태에 따른 리스트 조회 findAllQnaQuestionByIsAnswered /api/qna/my-questions
export const findAllQnaQuestionByIsAnswered = (qIsAnswered, pageno = 1, pagesize = 10) => api.get(`/api/qna/type-questions?qIsAnswered=${qIsAnswered}&pageno=${pageno}&pagesize=${pagesize}`)

// 본인이 작성한 질문 리스트 조회 (고객)
export const findQnaQuestionsByUsername = (username, pageno = 1, pagesize = 10) => api.get(`/api/qna/my-questions?username=${username}&pageno=${pageno}&pagesize=${pagesize}`)

// 질문 글 작성 writeQnaQuestion
export const writeQnaQuestion = (object) => api.post('/api/qna/write-question', object)

// 단일 글 조회 findQnaQuestionByQnoWithAnswer
export const findQnaQuestionByQnoWithAnswer = (qno) => api.get(`/api/qna/question?qno=${qno}`)

// 답변 작성 writeQnaAnswer
export const writeQnaAnswer = (object) => api.post(`/api/qna/write-answer`, object)

// // 질문 글 사진 다운로드 downloadQnaImage
// export const downloadQnaImage = (qno) => api.get(`/api/qna/downloadImg?qno=${qno}`)