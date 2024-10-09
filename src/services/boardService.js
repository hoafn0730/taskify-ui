import httpRequest from '~/utils/httpRequest';

const getBoards = async () => {
    return await httpRequest.get('/boards');
};

const getBoardBySlug = async (slug) => {
    return await httpRequest.get('/boards/' + slug);
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

export const boardService = { getBoards, getBoardBySlug, updateBoard, moveCardToDifferentColumn };
