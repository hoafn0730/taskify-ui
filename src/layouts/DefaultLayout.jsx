import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';

import Header from '~/components/Header/Header';

function DefaultLayout({ children }) {
    return (
        <Box>
            <Header />
            <Container disableGutters maxWidth={false}>
                {children}
            </Container>
        </Box>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
