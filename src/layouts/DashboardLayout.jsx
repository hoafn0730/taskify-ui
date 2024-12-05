import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import Header from './partials/Header';
import Sidebar from './partials/Sidebar';

function DashboardLayout({ children }) {
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

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DashboardLayout;
