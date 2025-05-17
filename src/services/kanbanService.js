import axiosInstance, { endpoints } from '~/utils/axios';

// [ ]
const getBoards = () => {
    return axiosInstance.get('/boards');
};

// [ ]
const searchBoards = (query) => {
    return axiosInstance.get('/boards/search', {
        params: {
            q: query,
        },
    });
};

const getBoardBySlug = (slug) => {
    return axiosInstance.get(import.meta.env.VITE_SERVER_BE_URL + endpoints.kanban.boards + '/' + slug, {
        withCredentials: true,
    });
};

// [ ]
const getCombinedBoards = () => {
    return axiosInstance.get('/boards/combined', {
        params: { boardStars: true },
    });
};

const createNewBoard = async (data) => {
    const res = await axiosInstance.post(import.meta.env.VITE_SERVER_BE_URL + endpoints.kanban.boards, data, {
        withCredentials: true,
    });
    return res.data;
};

// [ ]
const generateBoard = async (data) => {
    const res = await axiosInstance.post('/boards/generate', {
        ...data,
    });
    return res.data;
};

const updateBoard = (boardId, data) => {
    return axiosInstance.put(
        import.meta.env.VITE_SERVER_BE_URL + endpoints.kanban.boards + '/' + boardId,
        {
            ...data,
        },
        {
            withCredentials: true,
        },
    );
};

const toggleStarBoard = async (boardId, isStarred) => {
    const response = await axiosInstance.post(
        `${import.meta.env.VITE_SERVER_BE_URL}${endpoints.kanban.boards}/${boardId}/toggle-star`,
        { starred: isStarred },
        { withCredentials: true },
    );
    return response.data;
};

// [ ]
const updateBoardBackground = (boardId, data) => {
    return axiosInstance
        .put(`/boards/${boardId}/update-background`, {
            ...data,
        })
        .then((res) => res.data);
};

// Column
const createNewColumn = async (data) => {
    const res = await axiosInstance.post(import.meta.env.VITE_SERVER_BE_URL + endpoints.kanban.columns, data, {
        withCredentials: true,
    });
    return res.data;
};

const updateColumn = (columnId, data) => {
    return axiosInstance.put(import.meta.env.VITE_SERVER_BE_URL + endpoints.kanban.columns + '/' + columnId, data, {
        withCredentials: true,
    });
};

const deleteColumn = (columnId) => {
    return axiosInstance.delete(import.meta.env.VITE_SERVER_BE_URL + endpoints.kanban.columns + '/' + columnId, {
        withCredentials: true,
    });
};

const clearColumn = (columnId) => {
    return axiosInstance.delete(
        import.meta.env.VITE_SERVER_BE_URL + endpoints.kanban.columns + '/' + columnId + '/cards',
        {
            withCredentials: true,
        },
    );
};

const moveCardToDifferentColumn = (
    boardId,
    { currentCardId, prevColumnId, prevCardOrderIds, nextColumnId, nextCardOrderIds },
) => {
    return axiosInstance.put(
        `${import.meta.env.VITE_SERVER_BE_URL + endpoints.kanban.boards}/${boardId}/moving-card`,
        {
            currentCardId,
            prevColumnId,
            prevCardOrderIds,
            nextColumnId,
            nextCardOrderIds,
        },
        {
            withCredentials: true,
        },
    );
};

// Task
const createTask = async (data) => {
    const res = await axiosInstance.post(import.meta.env.VITE_SERVER_BE_URL + endpoints.kanban.cards, data, {
        withCredentials: true,
    });
    return res.data;
};

const updateTask = (cardId, data) => {
    return axiosInstance.put(import.meta.env.VITE_SERVER_BE_URL + endpoints.kanban.cards + '/' + cardId, data, {
        withCredentials: true,
    });
};

const deleteTask = (cardId) => {
    return axiosInstance.delete(import.meta.env.VITE_SERVER_BE_URL + endpoints.kanban.cards + '/' + cardId, {
        withCredentials: true,
    });
};

const toggleAssignee = (cardId, userId) => {
    return axiosInstance.post(
        import.meta.env.VITE_SERVER_BE_URL + endpoints.kanban.cards + '/' + cardId + '/toggle-assignee',
        { userId },
        {
            withCredentials: true,
        },
    );
};

const uploadFile = async (cardId, data) => {
    const res = await axiosInstance.post(
        import.meta.env.VITE_SERVER_BE_URL + endpoints.kanban.cards + '/' + cardId + '/files',
        data,
        {
            withCredentials: true,
        },
    );

    return res.data;
};

const deleteFile = (cardId, fileId) => {
    return axiosInstance.delete(
        import.meta.env.VITE_SERVER_BE_URL + endpoints.kanban.cards + '/' + cardId + '/files/' + fileId,
        {
            withCredentials: true,
        },
    );
};

export const kanbanService = {
    searchBoards,
    getBoards,
    getBoardBySlug,
    getCombinedBoards,
    createNewBoard,
    updateBoard,
    moveCardToDifferentColumn,
    generateBoard,
    updateBoardBackground,
    createNewColumn,
    updateColumn,
    deleteColumn,
    toggleStarBoard,
    clearColumn,
    createTask,
    updateTask,
    deleteTask,
    toggleAssignee,
    uploadFile,
    deleteFile,
};
