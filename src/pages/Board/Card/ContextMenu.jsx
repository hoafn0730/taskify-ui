import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

import { updateCard } from '~/store/actions/boardAction';

function ContextMenu({ anchorEl, data, onClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleArchive = () => {
        dispatch(updateCard({ columnId: data.columnId, cardId: data.id, data: { archived: true } }));
    };

    const handleOpen = () => {
        navigate(`/card/${data.slug}`, { state: { backgroundLocation: location } });
    };

    return (
        <Menu
            id="positioned-menu"
            aria-labelledby="positioned-button"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            sx={{ ml: 1 }}
        >
            <MenuItem
                onClick={() => {
                    handleOpen();
                    onClose();
                }}
            >
                <ListItemIcon>
                    <CreditCardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Open card</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleArchive}>
                <ListItemIcon>
                    <Inventory2OutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive</ListItemText>
            </MenuItem>
        </Menu>
    );
}

ContextMenu.propTypes = {
    anchorEl: PropTypes.node,
    data: PropTypes.object,
    onClose: PropTypes.func,
};

export default ContextMenu;
