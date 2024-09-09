import Box from '@mui/material/Box';
import MuiPopover from '@mui/material/Popover';
import PropTypes from 'prop-types';

function Popover({ children, render, open, anchorEl, anchorOrigin, onClose, ...props }) {
    return (
        <Box>
            {children}
            <MuiPopover open={open} anchorEl={anchorEl} onClose={onClose} anchorOrigin={anchorOrigin} {...props}>
                {render}
            </MuiPopover>
        </Box>
    );
}

Popover.propTypes = {
    children: PropTypes.node.isRequired,
    render: PropTypes.node,
    open: PropTypes.bool,
    anchorEl: PropTypes.any,
    anchorOrigin: PropTypes.object,
    onClose: PropTypes.func,
};

export default Popover;
