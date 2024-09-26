import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';

function LinkTab(props) {
    return <Tab component={Link} aria-current={props.selected && 'page'} {...props} />;
}

LinkTab.propTypes = {
    selected: PropTypes.bool,
};

export default LinkTab;
