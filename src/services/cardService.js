import httpRequest from '~/utils/httpRequest';

const createNewCard = async (data) => {
    const res = await httpRequest.post('/cards', {
        ...data,
    });
    return res.data;
};

const updateCard = async (cardId, data) => {
    return await httpRequest.put('/cards/' + cardId, {
        ...data,
    });
};

const deleteCard = async (cardId) => {
    return await httpRequest.delete('/cards/' + cardId);
};

export const cardService = { createNewCard, updateCard, deleteCard };
