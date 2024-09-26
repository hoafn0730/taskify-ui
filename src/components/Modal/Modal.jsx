import { useLocation, useNavigate } from 'react-router-dom';
import MuiModal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

function Modal({ children }) {
    const navigate = useNavigate();
    const { state } = useLocation();

    function handleDismiss() {
        navigate(-1);
    }

    return (
        <MuiModal
            open={!!state}
            onClose={handleDismiss}
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
                    width: 768,
                    minHeight: '600px',
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
                    onClick={handleDismiss}
                >
                    <CloseIcon />
                </Button>
            </Box>
        </MuiModal>
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Modal;
