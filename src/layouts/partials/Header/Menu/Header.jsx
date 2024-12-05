import { Box, Button, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function Header({ title, onBack }) {
    const { t } = useTranslation('header');

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button onClick={onBack} sx={{ p: 1 }}>
                <ChevronLeftIcon />
            </Button>
            <Typography
                variant="h4"
                sx={{
                    fontSize: '1rem',
                    ml: 1,
                }}
            >
                {t(title)}
            </Typography>
        </Box>
    );
}

Header.propTypes = {
    title: PropTypes.string,
    onBack: PropTypes.func,
};

export default Header;
