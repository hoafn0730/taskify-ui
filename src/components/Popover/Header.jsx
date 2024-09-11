import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PropTypes from 'prop-types';

function Header({ title, buttonTitle }) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: '16px',
                borderBottom: '1px solid var(--ds-border, #091e4224)',
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                }}
            >
                {title}
            </Typography>
            <Box sx={{ display: 'flex' }}>
                <Box>
                    <Button variant="text">{buttonTitle}</Button>
                </Box>
                <Button sx={{ p: 0.5, minWidth: 0, lineHeight: 0.8 }}>
                    <Typography variant="span" sx={{ display: 'flex', alignItems: 'center' }}>
                        <MoreVertIcon />
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
}

Header.propTypes = {
    title: PropTypes.string,
    buttonTitle: PropTypes.string,
};

export default Header;
