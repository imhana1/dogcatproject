import { create } from 'zustand'
import api from '../utils/api'


// 로그인정보(username, role) 저장
const useAuthStore = create(set => ({
    // 로그인x일 땐 둘 다 undefined
    username: undefined,
    role: undefined,

    // 로그인 되어있는지 확인하는 함수
    checkAuth: async () => {
        try {
            const response = await api.get('/api/auth/check'); // 주소 가서 읽어
            set(state => ({
                ...state,
                username: response.data.username,
                role: response.data.role
            }))
        } catch (err) {
            if(err.response?.status===409) {
                set(state => ({ ...state, username: null, role: null }));
                console.log(err);
            } else {
                console.log ("인증 확인 중 에러 발생", err);
            }

        }
    },

    // 로그인 성공하면 아이디, 역할을 저장
    setUserInfo: (username, role) => set(state => ({ ...state, username: username, role: role })),

    // 로그아웃하면 아이디, 역할을 삭제
    resetUserInfo: () => set(state => ({ ...state, username: null, role: null }))
}))

export default useAuthStore