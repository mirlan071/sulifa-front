"use client";

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    ReactNode
} from "react";

const WSContext = createContext<Client | null>(null);

// Хук, который возвращает STOMP-клиента
export function useWS(): Client | null {
    return useContext(WSContext);
}

// Провайдер WebSocket
export function WSProvider({ children }: { children: ReactNode }) {
    const [client, setClient] = useState<Client | null>(null);

    // ВАЖНО: используем useRef чтобы избежать лишних рендеров и ошибок
    const clientRef = useRef<Client | null>(null);

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");

        const stomp = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,        // авто-реконнект
            debug: () => {},             // отключить логи
        });

        clientRef.current = stomp;

        stomp.onConnect = () => {
            console.log("✅ WebSocket connected");
            setClient(stomp);
        };

        stomp.onStompError = (frame) => {
            console.error("❌ Broker error:", frame.headers["message"]);
        };

        stomp.activate();

        return () => {
            // cleanup НЕ должен быть async
            console.log("🔌 WebSocket disconnected");
            clientRef.current?.deactivate();
        };
    }, []);

    return (
        <WSContext.Provider value={client}>
            {children}
        </WSContext.Provider>
    );
}
