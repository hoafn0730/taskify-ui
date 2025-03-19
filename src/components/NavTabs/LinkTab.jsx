import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import { NavLink } from 'react-router-dom';

function LinkTab({ selected, ...props }) {
    return (
        <Tab
            component={NavLink}
            aria-current={selected && 'page'}
            {...props}
            sx={{
                color: selected && 'primary.main',
                ':hover': {
                    bgcolor: 'rgba(22, 160, 133, 0.04)',
                },
            }}
        />
    );
}

LinkTab.propTypes = {
    selected: PropTypes.bool,
};

export default LinkTab;
