import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function UploadFile({ fullWidth, onChange }) {
    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            fullWidth={fullWidth}
            sx={{ my: 1 }}
        >
            Choose a file
            <VisuallyHiddenInput type="file" onChange={onChange} multiple />
        </Button>
    );
}

UploadFile.propTypes = {
    fullWidth: PropTypes.bool,
    onChange: PropTypes.func,
};

export default UploadFile;
