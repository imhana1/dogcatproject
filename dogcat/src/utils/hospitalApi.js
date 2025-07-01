import api from "./api";

export const signup = (payload)=>api.post("/hospital/signup",payload);