import PropTypes from 'prop-types';
import InputFileUpload from '~/components/InputFileUpload';

function UploadFile({ onUploadFile }) {
    return <InputFileUpload onChange={onUploadFile} />;
}

UploadFile.propTypes = {
    isUploadCover: PropTypes.bool,
    card: PropTypes.object,
    onUploadFile: PropTypes.func,
};

export default UploadFile;
