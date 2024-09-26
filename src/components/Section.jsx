import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Section({ title, icon, children }) {
    return (
        <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                {icon}
                <Typography variant="h3" sx={{ fontSize: 16, fontWeight: '700', lineHeight: '24px' }}>
                    {title}
                </Typography>
            </Box>
            <Box>{children}</Box>
        </Box>
    );
}

Section.propTypes = { title: PropTypes.string, icon: PropTypes.node, children: PropTypes.node };

export default Section;
