import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function Link({ children, to, sx, ...props }) {
    return (
        <MuiLink component={RouterLink} to={to} sx={sx} {...props}>
            {children}
        </MuiLink>
    );
}

Link.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
    sx: PropTypes.object,
};

export default Link;
