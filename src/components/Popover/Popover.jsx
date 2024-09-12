import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import MuiPopover from '@mui/material/Popover';
import Header from './Header';

function Popover({ children, render, open, anchorEl, anchorOrigin, onClose, ...props }) {
    return (
        <Box>
            {children}
            <MuiPopover
                slotProps={{
                    paper: {
                        sx: {
                            width: '400px',
                            borderRadius: 2,
                            overflowX: 'none',
                            overflowY: 'auto',
                            minHeight: '300px',
                            maxHeight: 'min((100vh - 96px) - 120px, 600px)',
                        },
                    },
                }}
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={anchorOrigin}
                {...props}
            >
                {render}
            </MuiPopover>
        </Box>
    );
}

Popover.Header = Header;

Popover.propTypes = {
    children: PropTypes.node.isRequired,
    render: PropTypes.node,
    open: PropTypes.bool,
    anchorEl: PropTypes.any,
    anchorOrigin: PropTypes.object,
    onClose: PropTypes.func,
};

export default Popover;
