import { useState, useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';

export function useSocket(serverURL = 'http://localhost:5000') {
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef(null);

    const connect = useCallback(
        (token) => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }

            socketRef.current = io(serverURL, {
                auth: { token },
                autoConnect: true,
                withCredentials: true,
                transports: ['websocket', 'polling'], // Fallback transport
            });

            socketRef.current.on('connect', () => {
                console.log('Socket connected:', socketRef.current.id);
                setIsConnected(true);
            });

            socketRef.current.on('disconnect', () => {
                setIsConnected(false);
            });

            return socketRef.current;
        },
        [serverURL],
    );

    const disconnect = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
            setIsConnected(false);
        }
    }, []);

    const emit = useCallback((event, data) => {
        if (socketRef.current) {
            socketRef.current.emit(event, data);
        }
    }, []);

    const on = useCallback((event, callback) => {
        if (socketRef.current) {
            socketRef.current.on(event, callback);
        }
    }, []);

    const off = useCallback((event, callback) => {
        if (socketRef.current) {
            socketRef.current.off(event, callback);
        }
    }, []);

    useEffect(() => {
        return () => {
            disconnect();
        };
    }, [disconnect]);

    return {
        socket: socketRef.current,
        isConnected,
        connect,
        disconnect,
        emit,
        on,
        off,
    };
}
