import PropTypes from 'prop-types';
import { cloneDeep } from 'lodash';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// import UploadFile from '~/components/UploadFile/UploadFile';
// import { updateBoardData } from '~/store/slices/boardSlice';
// import { convertBase64 } from '~/utils/convertBase64';
// import { boardService } from '~/services/boardService';

function ChangeBackground({ onClose }) {
    const dispatch = useDispatch();
    const board = useSelector((state) => state.board.activeBoard);
    const [loading, setLoading] = useState(false);

    //     const handleUploadFile = async (e) => {
    //         const files = e.target.files;
    //
    //         if (files.length === 1) {
    //             const base64 = await convertBase64(files[0]);
    //             setLoading(true);
    //
    //             // call api update image board
    //             const updatedBoard = await boardService.updateBoardBackground(board.id, { file: base64 });
    //
    //             const newBoard = cloneDeep(board);
    //             newBoard.image = updatedBoard.image;
    //
    //             dispatch(updateBoardData(newBoard));
    //             setLoading(false);
    //             onClose();
    //         }
    //     };
    return (
        <Box>
            <Button></Button>
            {/* {<UploadFile onChange={handleUploadFile} />} */}
        </Box>
    );
}

ChangeBackground.propTypes = {
    onClose: PropTypes.func,
};

export default ChangeBackground;
