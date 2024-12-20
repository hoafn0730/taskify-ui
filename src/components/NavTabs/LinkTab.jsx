import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';

function LinkTab({ selected, ...props }) {
    return <Tab component={Link} aria-current={selected && 'page'} {...props} />;
}

LinkTab.propTypes = {
    selected: PropTypes.bool,
};

export default LinkTab;
