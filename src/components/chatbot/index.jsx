import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, Typography, TextField, IconButton, Avatar, Fab, Chip, Fade, Grow } from '@mui/material';
import {
    Send as SendIcon,
    SmartToy as BotIcon,
    Person as PersonIcon,
    Close as CloseIcon,
    Minimize as MinimizeIcon,
    Chat as ChatIcon,
} from '@mui/icons-material';

const ModernChatbot = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: 'Xin chào! Tôi là trợ lý AI của bạn. Tôi có thể giúp bạn với nhiều câu hỏi khác nhau. Bạn cần hỗ trợ gì hôm nay?',
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [inputText, setInputText] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const primaryColor = 'rgb(0, 167, 111)';

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputText.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: inputText,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            const botResponses = [
                'Cảm ơn bạn đã chia sẻ! Tôi hiểu vấn đề của bạn và sẽ cố gắng giúp đỡ tốt nhất có thể.',
                'Đây là một câu hỏi rất thú vị! Tôi có thể cung cấp thêm thông tin chi tiết về vấn đề này.',
                'Tôi sẽ phân tích thông tin bạn cung cấp và đưa ra những gợi ý phù hợp nhất.',
                'Dựa trên những gì bạn nói, tôi nghĩ có một số cách tiếp cận khác nhau cho vấn đề này.',
                'Tôi hiểu mối quan tâm của bạn. Hãy cùng tìm hiểu sâu hơn về chủ đề này nhé!',
            ];

            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

            const botMessage = {
                id: Date.now() + 1,
                text: randomResponse,
                sender: 'bot',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Typing indicator component
    const TypingIndicator = () => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ width: 28, height: 28, bgcolor: primaryColor }}>
                <BotIcon sx={{ fontSize: 16 }} />
            </Avatar>
            <Paper
                elevation={1}
                sx={{
                    px: 2,
                    py: 1.5,
                    borderRadius: 3,
                    bgcolor: '#f5f5f5',
                    maxWidth: '80%',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {[0, 1, 2].map((i) => (
                        <Box
                            key={i}
                            sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: '#999',
                                animation: 'bounce 1.4s infinite ease-in-out',
                                animationDelay: `${i * 0.2}s`,
                                '@keyframes bounce': {
                                    '0%, 80%, 100%': {
                                        transform: 'scale(0)',
                                    },
                                    '40%': {
                                        transform: 'scale(1)',
                                    },
                                },
                            }}
                        />
                    ))}
                </Box>
            </Paper>
        </Box>
    );

    if (!isOpen) {
        return (
            <Fab
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    bgcolor: primaryColor,
                    color: 'white',
                    '&:hover': {
                        bgcolor: primaryColor,
                        transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                    zIndex: 1000,
                }}
                onClick={() => setIsOpen(true)}
            >
                <ChatIcon />
            </Fab>
        );
    }

    return (
        <Fade in={isOpen}>
            <Paper
                elevation={10}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    width: 380,
                    height: 600,
                    borderRadius: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    zIndex: 1000,
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        bgcolor: primaryColor,
                        color: 'white',
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                            <BotIcon />
                        </Avatar>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                AI Assistant
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                Luôn sẵn sàng hỗ trợ
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton
                            size="small"
                            sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                            onClick={() => setIsOpen(false)}
                        >
                            <MinimizeIcon />
                        </IconButton>
                        <IconButton
                            size="small"
                            sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                            onClick={() => setIsOpen(false)}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>

                {/* Messages */}
                <Box
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        '&::-webkit-scrollbar': {
                            width: 6,
                        },
                        '&::-webkit-scrollbar-track': {
                            bgcolor: '#f1f1f1',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            bgcolor: '#c1c1c1',
                            borderRadius: 3,
                        },
                    }}
                >
                    {messages.map((message) => (
                        <Grow key={message.id} in timeout={500}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                    alignItems: 'flex-start',
                                    gap: 1,
                                }}
                            >
                                {message.sender === 'bot' && (
                                    <Avatar sx={{ width: 28, height: 28, bgcolor: primaryColor }}>
                                        <BotIcon sx={{ fontSize: 16 }} />
                                    </Avatar>
                                )}

                                <Box sx={{ maxWidth: '80%' }}>
                                    <Paper
                                        elevation={1}
                                        sx={{
                                            px: 2,
                                            py: 1.5,
                                            borderRadius: 3,
                                            bgcolor: message.sender === 'user' ? primaryColor : '#f5f5f5',
                                            color: message.sender === 'user' ? 'white' : 'text.primary',
                                            borderBottomRightRadius: message.sender === 'user' ? 1 : 3,
                                            borderBottomLeftRadius: message.sender === 'bot' ? 1 : 3,
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                                            {message.text}
                                        </Typography>
                                    </Paper>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            display: 'block',
                                            mt: 0.5,
                                            color: 'text.secondary',
                                            textAlign: message.sender === 'user' ? 'right' : 'left',
                                        }}
                                    >
                                        {formatTime(message.timestamp)}
                                    </Typography>
                                </Box>

                                {message.sender === 'user' && (
                                    <Avatar sx={{ width: 28, height: 28, bgcolor: '#666' }}>
                                        <PersonIcon sx={{ fontSize: 16 }} />
                                    </Avatar>
                                )}
                            </Box>
                        </Grow>
                    ))}

                    {isTyping && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                </Box>

                {/* Input */}
                <Box
                    sx={{
                        borderTop: 1,
                        borderColor: 'divider',
                        p: 2,
                        bgcolor: '#fafafa',
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                        <TextField
                            fullWidth
                            multiline
                            maxRows={3}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Nhập tin nhắn của bạn..."
                            variant="outlined"
                            size="small"
                            inputProps={{ maxLength: 500 }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    '&:hover fieldset': {
                                        borderColor: primaryColor,
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: primaryColor,
                                    },
                                },
                            }}
                        />
                        <IconButton
                            onClick={handleSend}
                            disabled={!inputText.trim()}
                            sx={{
                                bgcolor: primaryColor,
                                color: 'white',
                                '&:hover': {
                                    bgcolor: primaryColor,
                                    transform: 'scale(1.05)',
                                },
                                '&:disabled': {
                                    bgcolor: '#ccc',
                                    color: 'white',
                                },
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <SendIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                            Nhấn Enter để gửi
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {inputText.length}/500
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Fade>
    );
};

export default ModernChatbot;
