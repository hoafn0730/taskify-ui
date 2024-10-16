import { Box, Typography } from '@mui/material';
import MuiMenu from '@mui/material/Menu';
import PropTypes from 'prop-types';

function Menu({ children, title, open, anchorEl, anchorOrigin, transformOrigin, onClose, ...props }) {
    return (
        <MuiMenu
            id="basic-menu"
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            {...props}
        >
            <Box
                component={'header'}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: '4px 8px' }}
            >
                <Typography variant="h2" sx={{ fontSize: '14px', fontWeight: 600, color: '#44546f' }}>
                    {title}
                </Typography>
            </Box>
            {children}
        </MuiMenu>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    open: PropTypes.bool,
    anchorEl: PropTypes.any,
    anchorOrigin: PropTypes.object,
    transformOrigin: PropTypes.object,
    onClose: PropTypes.func,
};

export default Menu;
