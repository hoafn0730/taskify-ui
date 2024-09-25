import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Section({ title, icon, button, children }) {
    return (
        <Box component={'section'} sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {icon}
                    <Typography variant="h3" fontSize={'16px'} fontWeight={'600'}>
                        {title}
                    </Typography>
                </Box>
                {button}
            </Box>
            <Box>{children}</Box>
        </Box>
    );
}

Section.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.node,
    button: PropTypes.node,
    children: PropTypes.node,
};

export default Section;
