import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { useTranslation } from 'react-i18next';
import { cardService } from '~/services/cardService';
import { cloneDeep } from 'lodash';
import { updateBoardData } from '~/store/slices/boardSlice';
import dayjs from 'dayjs';

function ContextMenu({ anchorEl, card, onClose }) {
    const { t } = useTranslation('board');
    const board = useSelector((state) => state.board.activeBoard);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleArchive = () => {
        const updateData = {
            archivedAt: dayjs(new Date()).toISOString(),
        };
        const newBoard = cloneDeep(board);

        const column = newBoard.columns.find((col) => col.id === card.columnId);
        const activeCard = column.cards.find((c) => c.id === card.id);

        Object.assign(activeCard, updateData);

        column.cards = column.cards.filter((c) => c.id !== card.id);
        column.cardOrderIds = column.cardOrderIds.filter((cardId) => cardId !== card.uuid);

        dispatch(updateBoardData(newBoard));

        cardService.updateCard(card?.id, updateData);
    };

    const handleOpen = () => {
        navigate(`/card/${card.slug}`, { state: { backgroundLocation: location } });
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
                <ListItemText>{t('openCard')}</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleArchive}>
                <ListItemIcon>
                    <Inventory2OutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{t('archive')}</ListItemText>
            </MenuItem>
        </Menu>
    );
}

ContextMenu.propTypes = {
    anchorEl: PropTypes.any,
    card: PropTypes.object,
    onClose: PropTypes.func,
};

export default ContextMenu;
