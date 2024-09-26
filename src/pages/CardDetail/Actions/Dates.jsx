import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Popover, Typography } from '@mui/material';
import DateTimePicker from '~/components/DateTimePicker';

function Dates({ anchorEl, onClose }) {
    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <Box sx={{ width: '304px' }}>
                <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                <DateTimePicker />
            </Box>
        </Popover>
    );
}

Dates.propTypes = {
    anchorEl: PropTypes.node,
    onClose: PropTypes.func,
};

export default Dates;
