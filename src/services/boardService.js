import httpRequest from '~/utils/httpRequest';

const getBoards = () => {
    return httpRequest.get('/boards');
};

const searchBoards = (query) => {
    return httpRequest.get('/boards/search', {
        params: {
            q: query,
        },
    });
};

const getBoardBySlug = (slug) => {
    return httpRequest.get('/boards/' + slug);
};

const createNewBoard = async (data) => {
    const res = await httpRequest.post('/boards', {
        ...data,
    });
    return res.data;
};

const updateBoard = (boardId, data) => {
    return httpRequest.put('/boards/' + boardId, {
        ...data,
    });
};

const moveCardToDifferentColumn = (data) => {
    return httpRequest.put('/boards/supports/moving_card', {
        ...data,
    });
};

export const boardService = {
    searchBoards,
    getBoards,
    getBoardBySlug,
    createNewBoard,
    updateBoard,
    moveCardToDifferentColumn,
};
