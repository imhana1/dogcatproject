import { create } from 'zustand'
import api from '../utils/api'
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";

// 로그인정보(username, role) 저장
const useAuthStore = create((set,get) => ({
    // 로그인x일 땐 둘 다 undefined
    username: undefined,
    role: undefined,
    socket: undefined,

    connectWebSocket:()=>{
        if(get().socket)
            return;
        const client = new Client({
            // 연결 끊어지면 대기 후 재연결 요청을 보낼 간격 설정 -> 금지
            reconnectDelay: 0,
            webSocketFactory:()=>new SockJS("http://localhost:8080/ws"),
            onConnect:()=>set({socket:client})
        })
        client.activate();
    },

    // 로그인 되어있는지 확인하는 함수
    checkAuth: async () => {
        try {
            const prevUsername = get().username;
            const response = await api.get('/api/auth/check'); // 주소 가서 읽어
            const {username, role} = response.data;
            set(state => ({
                ...state,
                username: response.data.username,
                role: response.data.role,
                isAuthChecked: true // ✅ 인증 완료 표시
            }))
            if(prevUsername !== username)
                get().connectWebSocket();
        } catch (err) {
            if(err.response?.status===409) {
                set(state => ({ ...state, username: null, role: null }));
                console.log(err);
            } else {
                console.log ("인증 확인 중 에러 발생", err);
            }

            if(get().socket)
                get().socket.deactivate();
            set(state => ({ ...state, username: null, role: null, socket:null,
                isAuthChecked: true }));  // ✅ 실패해도 완료 처리 인증 시도가 끝났다는 표시
            console.log(err);
        }
    },

    // 로그인 성공하면 아이디, 역할을 저장
    setUserInfo: (username, role) => {
        set(state => ({ ...state, username: username, role: role }))
        get().connectWebSocket();
    },

    // 로그아웃하면 아이디, 역할을 삭제
    resetUserInfo: () => {
        if(get().socket)
            get().socket.deactivate();
        set(state => ({ ...state, username: null, role: null, socket:null }))
    }
}))

export default useAuthStore