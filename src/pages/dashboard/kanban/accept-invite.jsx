import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { alpha } from '@mui/material/styles';

import { Iconify } from '~/components/iconify';
import { kanbanService } from '~/services/kanbanService';
import { useRouter } from '~/routes/hooks';

const AcceptInvite = () => {
    const [searchParams] = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [status, setStatus] = useState('verifying'); // verifying | success | error
    const [message, setMessage] = useState('');
    const [boardData, setBoardData] = useState(null);

    useEffect(() => {
        // Thêm kiểm tra để đảm bảo API chỉ được gọi một lần
        if (token) {
            const acceptInvite = async () => {
                try {
                    const res = await kanbanService.acceptInvite(token);

                    setStatus('success');
                    setMessage(res.message || 'Invitation accepted successfully');
                    setBoardData(res.data);

                    // Điều hướng tới board sau 2s
                    setTimeout(() => {
                        router.replace(`/dashboard/kanban/${res.data.slug}`);
                    }, 5000);
                } catch (err) {
                    setStatus('error');
                    setMessage(err?.response?.data?.message || 'Failed to accept invitation');
                }
            };

            acceptInvite();
        }
    }, []); // Thêm tất cả các dependencies cần thiết

    // Hiển thị nội dung dựa trên trạng thái
    const renderContent = () => {
        switch (status) {
            case 'verifying':
                return (
                    <>
                        <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
                        <Typography variant="h5" gutterBottom fontWeight="medium">
                            Verifying invitation...
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Please wait while we process your invitation
                        </Typography>
                    </>
                );
            case 'success':
                return (
                    <>
                        <Iconify icon="solar:check-circle-bold" sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
                        <Typography variant="h5" gutterBottom fontWeight="medium">
                            Invitation Accepted!
                        </Typography>
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                            {message}
                        </Typography>
                        {boardData && (
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Redirecting to {boardData.title}...
                            </Typography>
                        )}
                    </>
                );
            case 'error':
                return (
                    <>
                        <Iconify icon="solar:close-circle-bold" sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
                        <Typography variant="h5" gutterBottom fontWeight="medium">
                            Invitation Failed
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {message}
                        </Typography>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: (theme) =>
                    status === 'success'
                        ? alpha(theme.palette.success.light, 0.1)
                        : status === 'error'
                        ? alpha(theme.palette.error.light, 0.1)
                        : 'background.default',
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={3}
                    sx={{
                        p: 5,
                        textAlign: 'center',
                        borderRadius: 2,
                        ...(status === 'success' && {
                            borderLeft: 5,
                            borderColor: 'success.main',
                        }),
                        ...(status === 'error' && {
                            borderLeft: 5,
                            borderColor: 'error.main',
                        }),
                    }}
                >
                    {renderContent()}
                </Paper>
            </Container>
        </Box>
    );
};

export default AcceptInvite;
