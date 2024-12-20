import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

import Menu from '~/components/Menu';
import { cardService } from '~/services/cardService';
import { updateBoardData } from '~/store/slices/boardSlice';

function ContextMenu({ anchorEl, card, onClose }) {
    const { t } = useTranslation('board');
    const board = useSelector((state) => state.board.activeBoard);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const contextMenu = [
        {
            title: t('openCard'),
            icon: <CreditCardIcon fontSize="small" />,
            type: 'openCard',
        },
        {
            title: t('archive'),
            icon: <Inventory2OutlinedIcon fontSize="small" />,
            type: 'archive',
        },
    ];

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

    const handleMenuChange = (menuItem, e) => {
        switch (menuItem.type) {
            case 'openCard':
                handleOpen();
                onClose();
                break;
            case 'archive':
                handleArchive();
                break;

            default:
        }
    };

    return (
        <Menu
            anchorEl={anchorEl}
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
            items={contextMenu}
            onChange={handleMenuChange}
        />
    );
}

ContextMenu.propTypes = {
    anchorEl: PropTypes.any,
    card: PropTypes.object,
    onClose: PropTypes.func,
};

export default ContextMenu;
