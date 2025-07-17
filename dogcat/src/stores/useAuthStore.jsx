import { create } from 'zustand'
import api from '../utils/api'
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";

// 로그인정보(username, role) 저장
const useAuthStore = create((set,get) => ({
    // 로그인x일 땐 둘 다 undefined
    username: null,       // 로그인되지 않았을 때는 null로 명확히 설정 (✅ 수정: undefined -> null)
    role: null,           // 로그인되지 않았을 때는 null로 명확히 설정 (✅ 수정: undefined -> null)
    socket: null,         // WebSocket 클라이언트 인스턴스
    isAuthChecked: false, // ✅ 인증 확인 작업이 완료되었는지 나타내는 플래그 (초기값: false로 명확히 설정)


    connectWebSocket:()=>{
        // ✅ 수정: socket이 존재하고 '활성' 상태일 때만 리턴하도록 조건 강화
        if (get().socket && get().socket.active) {
            return;
        }

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
        // ✅ 수정: 인증 확인 작업 시작 전에 isAuthChecked를 false로 설정하여 로딩 상태 시작을 명확히 함
        set(state => ({ ...state, isAuthChecked: false }));

        try {
            const prevUsername = get().username;
            const response = await api.get('/api/auth/check'); // 주소 가서 읽어
            const {username, role} = response.data;
            set(state => ({
                ...state,
                username: username, // 서버에서 받은 username으로 업데이트
                role: role,         // 서버에서 받은 role로 업데이트
                isAuthChecked: true // ✅ 수정: 인증 확인 완료 (성공 시)
            }));
            // 이전 사용자와 현재 사용자가 다르면 WebSocket 연결
            // ✅ 수정: username이 null이 아닌 경우에만 연결 시도 (로그아웃 상태에서는 연결X)
            if (prevUsername !== username && username !== null) {
                get().connectWebSocket();
            }

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
        // ✅ 수정: 활성화된 소켓이 있을 때만 해제하도록 조건 추가
        if (get().socket && get().socket.active) {
            get().socket.deactivate();
        }

        set(state => ({
            ...state,
            username: null,
            role: null,
            socket: null, // ✅ 추가: 로그아웃 시 소켓 상태도 null로 설정
            isAuthChecked: true // ✅ 추가: 로그아웃 후에는 인증 확인이 완료된 상태로 간주
        }));

    }
}))

export default useAuthStore