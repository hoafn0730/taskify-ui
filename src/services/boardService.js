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

const getCombinedBoards = () => {
    return httpRequest.get('/boards/combined', {
        params: { boardStars: true },
    });
};

const createNewBoard = async (data) => {
    const res = await httpRequest.post('/boards', {
        ...data,
    });
    return res.data;
};

const generateBoard = async (data) => {
    const res = await httpRequest.post('/boards/generate', {
        ...data,
    });
    return res.data;
};

const updateBoard = (boardId, data) => {
    return httpRequest.put('/boards/' + boardId, {
        ...data,
    });
};

const moveCardToDifferentColumn = (boardId, data) => {
    return httpRequest.put(`/boards/${boardId}/moving-card`, {
        ...data,
    });
};

const updateBoardBackground = (boardId, data) => {
    return httpRequest
        .put(`/boards/${boardId}/update-background`, {
            ...data,
        })
        .then((res) => res.data);
};

export const boardService = {
    searchBoards,
    getBoards,
    getBoardBySlug,
    getCombinedBoards,
    createNewBoard,
    updateBoard,
    moveCardToDifferentColumn,
    generateBoard,
    updateBoardBackground,
};
