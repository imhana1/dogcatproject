import axios from "axios";

const api = axios.create({baseURL:'http://localhost:8080', withCredentials: true});

export const deletePet = (pno) => api.delete(`api/nuser-petchange?pno=${pno}`)

export default api;