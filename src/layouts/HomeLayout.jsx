import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';

import AppBar from '~/components/AppBar';
import Footer from '~/components/Footer';

function HomeLayout({ children }) {
    return (
        <Box>
            <AppBar />
            <Container maxWidth="lg" component="main" sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}>
                {children}
            </Container>
            <Footer />
        </Box>
    );
}

HomeLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default HomeLayout;
