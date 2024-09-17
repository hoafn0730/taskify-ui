import httpRequest from '~/utils/httpRequest';

const getBoard = async (boardId) => {
    return await httpRequest.get('/boards/' + boardId);
};

const updateBoard = async (boardId, data) => {
    return await httpRequest.put('/boards/' + boardId, {
        ...data,
    });
};

export const moveCardToDifferentColumn = async (data) => {
    const response = await httpRequest.put('/boards/supports/moving_card', {
        ...data,
    });
    return response;
};

export const boardService = { getBoard, updateBoard, moveCardToDifferentColumn };
