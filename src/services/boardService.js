import httpRequest from '~/utils/httpRequest';

const getBoard = async (boardId) => {
    return await httpRequest.get('/boards/' + boardId);
};

const moveColumns = async (prevColumnId, nextColumnId) => {
    const response = await httpRequest.put('/columns/moving_column', { prevColumnId, nextColumnId });
    return response.data;
};

export const boardService = { getBoard, moveColumns };
