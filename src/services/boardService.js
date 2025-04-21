import axiosInstance from '~/utils/axios';

const getBoards = () => {
    return axiosInstance.get('/boards');
};

const searchBoards = (query) => {
    return axiosInstance.get('/boards/search', {
        params: {
            q: query,
        },
    });
};

const getBoardBySlug = (slug) => {
    return axiosInstance.get('/api/v1/boards/' + slug);
};

const getCombinedBoards = () => {
    return axiosInstance.get('/boards/combined', {
        params: { boardStars: true },
    });
};

const createNewBoard = async (data) => {
    const res = await axiosInstance.post('/boards', {
        ...data,
    });
    return res.data;
};

const generateBoard = async (data) => {
    const res = await axiosInstance.post('/boards/generate', {
        ...data,
    });
    return res.data;
};

const updateBoard = (boardId, data) => {
    return axiosInstance.put('/boards/' + boardId, {
        ...data,
    });
};

const moveCardToDifferentColumn = (boardId, data) => {
    return axiosInstance.put(`/boards/${boardId}/moving-card`, {
        ...data,
    });
};

const updateBoardBackground = (boardId, data) => {
    return axiosInstance
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
