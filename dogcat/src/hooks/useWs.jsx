import {useEffect, useRef} from "react";
import {Client} from "@stomp/stompjs";

function useWs(url, handler){
    const socket= useRef(null);
    useEffect(() => {
        const client = new Client({
            reconnectDelay: 5000,
            webSocketFactory:()=>new SockJS("http://localhost:8080/ws"),
            onConnect:()=>{
                console.log("웹소켓 연결");
                // 수신, 주소, 수신할 때 수행할 동작을 컴포넌트 마다 다르게 하겠다
                client.subscribe(url, handler);
            }
        });
        client.activate();
        socket.current = client;
    },[url])
    return socket;
}
export default useWs