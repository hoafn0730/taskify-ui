import Box from '@mui/material/Box';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { convertBase64 } from '~/utils/convertBase64';
import { attachmentService } from '~/services/attachmentService';
import InputFileUpload from '~/components/InputFileUpload';

// eslint-disable-next-line react/prop-types
function UploadFile({ isUploadCover, setUrl, cardId }) {
    const [loading, setLoading] = useState(false);

    const handleUploadFile = async (e) => {
        const files = e.target.files;

        if (files.length === 1) {
            const base64 = await convertBase64(files[0]);
            setLoading(true);

            attachmentService
                .createNewAttachment({ cardId, cover: isUploadCover, fileName: files[0].name, file: base64 })
                .then((res) => {
                    setUrl(res);
                    setLoading(false);
                });
        }
    };

    return <Box>{loading ? <CircularProgress size="3rem" /> : <InputFileUpload onChange={handleUploadFile} />}</Box>;
}

export default UploadFile;
