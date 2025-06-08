import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';

// =============================================
// 1. CREATE SOCKET CONTEXT
// =============================================

const SocketContext = createContext(null);

// =============================================
// 2. SOCKET PROVIDER COMPONENT
// =============================================

export function SocketProvider({ children, serverURL = 'http://localhost:5000' }) {
    const [isConnected, setIsConnected] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);
    const socketRef = useRef(null);
    const isInitialized = useRef(false);

    // Initialize socket once
    useEffect(() => {
        if (!isInitialized.current) {
            console.log('🔧 [SocketProvider] Initializing socket...');

            socketRef.current = io(serverURL, {
                autoConnect: false,
                withCredentials: true,
                transports: ['websocket', 'polling'],
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
            });

            // Setup socket events
            socketRef.current.on('connect', () => {
                console.log('✅ [SocketProvider] Socket connected:', socketRef.current.id);
                setIsConnected(true);
                setError(null);

                // Auto emit login when connected
                socketRef.current.emit('login');
            });

            socketRef.current.on('disconnect', (reason) => {
                console.log('❌ [SocketProvider] Socket disconnected:', reason);
                setIsConnected(false);
                setIsAuthenticated(false);
            });

            socketRef.current.on('connect_error', (error) => {
                console.error('🚫 [SocketProvider] Socket connection error:', error.message);
                setIsConnected(false);
                setIsAuthenticated(false);
                setError(error.message);
            });

            socketRef.current.on('error', (error) => {
                console.error('🚫 [SocketProvider] Server error:', error);
                setError(error.message);
            });

            isInitialized.current = true;
        }
    }, [serverURL]);

    // Connect function - chỉ gọi 1 lần từ App
    const connect = useCallback(
        (token = null) => {
            if (!socketRef.current) {
                console.error('[SocketProvider] Socket not initialized');
                return null;
            }

            if (isAuthenticated && socketRef.current.connected) {
                console.log('⚠️ [SocketProvider] Already connected and authenticated');
                return socketRef.current;
            }

            console.log('🔐 [SocketProvider] Connecting socket...');

            // Set auth token if provided
            if (token) {
                socketRef.current.auth = { token };
            }

            // Connect
            socketRef.current.connect();
            setIsAuthenticated(true);

            return socketRef.current;
        },
        [isAuthenticated],
    );

    // Disconnect function
    const disconnect = useCallback(() => {
        if (socketRef.current) {
            console.log('🔌 [SocketProvider] Disconnecting socket...');
            socketRef.current.disconnect();
            setIsAuthenticated(false);
        }
    }, []);

    // Emit function
    const emit = useCallback((event, data) => {
        console.log('📤 [SocketProvider] Emitting event:', event, data);

        if (socketRef.current && socketRef.current.connected) {
            socketRef.current.emit(event, data);
        } else {
            console.warn('⚠️ [SocketProvider] Socket not connected, cannot emit:', event);
        }
    }, []);

    // On function
    const on = useCallback((event, callback) => {
        if (socketRef.current) {
            socketRef.current.on(event, callback);
        }
    }, []);

    // Off function
    const off = useCallback((event, callback) => {
        if (socketRef.current) {
            socketRef.current.off(event, callback);
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (socketRef.current) {
                console.log('🧹 [SocketProvider] Cleaning up socket...');
                socketRef.current.disconnect();
                socketRef.current.removeAllListeners();
            }
        };
    }, []);

    // Context value
    const value = {
        socket: socketRef.current,
        isConnected,
        isAuthenticated,
        error,
        connect,
        disconnect,
        emit,
        on,
        off,
    };

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export function useSocket() {
    const context = useContext(SocketContext);

    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }

    return context;
}

export function useSocketEvent(event, callback, deps = []) {
    const { on, off } = useSocket();

    useEffect(() => {
        if (typeof callback === 'function') {
            on(event, callback);

            return () => {
                off(event, callback);
            };
        }
    }, [event, callback, on, off, ...deps]);
}
