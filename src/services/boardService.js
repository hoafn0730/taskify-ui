import httpRequest from '~/utils/httpRequest';

const getBoards = async () => {
    return await httpRequest.get('/boards');
};

const getBoardBySlug = async (slug) => {
    return await httpRequest.get('/boards/' + slug);
};

const createNewBoard = async (data) => {
    const res = await httpRequest.post('/boards', {
        ...data,
    });
    return res.data.data;
};

const updateBoard = async (boardId, data) => {
    return await httpRequest.put('/boards/' + boardId, {
        ...data,
    });
};

const moveCardToDifferentColumn = async (data) => {
    const response = await httpRequest.put('/boards/supports/moving_card', {
        ...data,
    });
    return response;
};

export const boardService = { getBoards, getBoardBySlug, createNewBoard, updateBoard, moveCardToDifferentColumn };
