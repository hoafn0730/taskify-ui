import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';

import Header from '~/components/Header/Header';
import Sidebar from '~/components/Sidebar/Sidebar';

function HomeDashboardLayout({ children }) {
    return (
        <Box>
            <Header />
            <Container disableGutters maxWidth={false} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Sidebar />
                <Box sx={{ margin: '40px 16px 0', maxWidth: '825px', minWidth: '288px', width: '100%' }}>
                    {children}
                </Box>
            </Container>
        </Box>
    );
}

HomeDashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default HomeDashboardLayout;
