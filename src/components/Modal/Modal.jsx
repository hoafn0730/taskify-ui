import MuiModal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

function Modal({ size = 'normal', children, open, onClose }) {
    let width;
    if (size === 'normal') {
        width = 750;
    } else if (size === 'large') {
        width = 1000;
    } else if (size === 'small') {
        width = 600;
    }

    return (
        <MuiModal
            open={open}
            onClose={onClose}
            data-no-dnd={true}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                overflowY: 'auto',
                scrollbarGutter: 'stable',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: width,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 4,
                    p: 2,
                    pt: 0,
                    outline: 0,
                    my: '48px',
                }}
            >
                {children}
                <Button
                    sx={{
                        p: 0.8,
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        borderRadius: '50%',
                        minWidth: 'auto',
                    }}
                    onClick={onClose}
                >
                    <CloseIcon />
                </Button>
            </Box>
        </MuiModal>
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    size: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
};

export default Modal;
