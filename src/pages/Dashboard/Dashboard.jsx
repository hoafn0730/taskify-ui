import Box from '@mui/material/Box';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';

import Section from '~/components/Section';
import Task from './Task';
import { Typography } from '@mui/material';

function Dashboard() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '420px' }}>
                <Section title="Up next" icon={<AccessTimeRoundedIcon fontSize="small" />}>
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                </Section>
            </Box>
            <Box
                sx={{
                    height: '90vh',
                    maxWidth: '342px',
                    overflowY: 'auto',
                    pl: '50px',
                    position: 'sticky',
                    top: '40px',
                    width: '100%',
                }}
            >
                <Section title="Starred" icon={<StarOutlineRoundedIcon fontSize="small" />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, p: 0.5 }}>
                        <Box
                            sx={{ height: '30px', borderRadius: 1 }}
                            component={'img'}
                            src="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x480/1849a4a0cc47bd7f5c6e08a06cf3affa/photo-1516553174826-d05833723cd4.jpg"
                            alt=""
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h5" sx={{ fontSize: '16px', fontWeight: '600', lineHeight: '18px' }}>
                                Remote Team Meetings
                            </Typography>
                            <Typography variant="span" sx={{ fontSize: '12px', lineHeight: '16px' }}>
                                Hoafn Workspace
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, p: 0.5 }}>
                        <Box
                            sx={{ height: '30px', borderRadius: 1 }}
                            component={'img'}
                            src="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x480/1849a4a0cc47bd7f5c6e08a06cf3affa/photo-1516553174826-d05833723cd4.jpg"
                            alt=""
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h5" sx={{ fontSize: '16px', fontWeight: '600', lineHeight: '18px' }}>
                                Remote Team Meetings
                            </Typography>
                            <Typography variant="span" sx={{ fontSize: '12px', lineHeight: '16px' }}>
                                Hoafn Workspace
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, p: 0.5 }}>
                        <Box
                            sx={{ height: '30px', borderRadius: 1 }}
                            component={'img'}
                            src="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x480/1849a4a0cc47bd7f5c6e08a06cf3affa/photo-1516553174826-d05833723cd4.jpg"
                            alt=""
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h5" sx={{ fontSize: '16px', fontWeight: '600', lineHeight: '18px' }}>
                                Remote Team Meetings
                            </Typography>
                            <Typography variant="span" sx={{ fontSize: '12px', lineHeight: '16px' }}>
                                Hoafn Workspace
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, p: 0.5 }}>
                        <Box
                            sx={{ height: '30px', borderRadius: 1 }}
                            component={'img'}
                            src="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x480/1849a4a0cc47bd7f5c6e08a06cf3affa/photo-1516553174826-d05833723cd4.jpg"
                            alt=""
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h5" sx={{ fontSize: '16px', fontWeight: '600', lineHeight: '18px' }}>
                                Remote Team Meetings
                            </Typography>
                            <Typography variant="span" sx={{ fontSize: '12px', lineHeight: '16px' }}>
                                Hoafn Workspace
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, p: 0.5 }}>
                        <Box
                            sx={{ height: '30px', borderRadius: 1 }}
                            component={'img'}
                            src="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x480/1849a4a0cc47bd7f5c6e08a06cf3affa/photo-1516553174826-d05833723cd4.jpg"
                            alt=""
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h5" sx={{ fontSize: '16px', fontWeight: '600', lineHeight: '18px' }}>
                                Remote Team Meetings
                            </Typography>
                            <Typography variant="span" sx={{ fontSize: '12px', lineHeight: '16px' }}>
                                Hoafn Workspace
                            </Typography>
                        </Box>
                    </Box>
                </Section>
                <Section title="Recently viewed" icon={<AccessTimeRoundedIcon fontSize="small" />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, p: 0.5 }}>
                        <Box
                            sx={{ height: '30px', borderRadius: 1 }}
                            component={'img'}
                            src="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x480/1849a4a0cc47bd7f5c6e08a06cf3affa/photo-1516553174826-d05833723cd4.jpg"
                            alt=""
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h5" sx={{ fontSize: '16px', fontWeight: '600', lineHeight: '18px' }}>
                                Remote Team Meetings
                            </Typography>
                            <Typography variant="span" sx={{ fontSize: '12px', lineHeight: '16px' }}>
                                Hoafn Workspace
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, p: 0.5 }}>
                        <Box
                            sx={{ height: '30px', borderRadius: 1 }}
                            component={'img'}
                            src="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x480/1849a4a0cc47bd7f5c6e08a06cf3affa/photo-1516553174826-d05833723cd4.jpg"
                            alt=""
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h5" sx={{ fontSize: '16px', fontWeight: '600', lineHeight: '18px' }}>
                                Remote Team Meetings
                            </Typography>
                            <Typography variant="span" sx={{ fontSize: '12px', lineHeight: '16px' }}>
                                Hoafn Workspace
                            </Typography>
                        </Box>
                    </Box>
                </Section>
            </Box>
        </Box>
    );
}

export default Dashboard;
