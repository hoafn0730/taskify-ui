import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';

const DrawerHeader = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'center',
}));

function MenuHeader({ title, onBack, onClose }) {
    return (
        <DrawerHeader>
            {!!onBack && (
                <IconButton sx={{ position: 'absolute', left: 6 }} onClick={onBack}>
                    <KeyboardArrowLeftRoundedIcon />
                </IconButton>
            )}
            <Typography variant="h3" sx={{ fontSize: '16px', fontWeight: 600 }}>
                {title}
            </Typography>
            <IconButton sx={{ position: 'absolute', right: 6 }} onClick={onClose}>
                <CloseRoundedIcon />
            </IconButton>
        </DrawerHeader>
    );
}

MenuHeader.propTypes = {
    title: PropTypes.string,
    onBack: PropTypes.func,
    onClose: PropTypes.func,
};

export default MenuHeader;
