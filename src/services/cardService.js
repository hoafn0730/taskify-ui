import httpRequest from '~/utils/httpRequest';

const getCards = async () => {
    return await httpRequest.get('/cards');
};

const getCardDetail = async (cardId) => {
    return await httpRequest.get('/cards/' + cardId);
};

const getCardDetailBySlug = async (slug) => {
    return await httpRequest.get('/cards/' + slug);
};

const createNewCard = async (data) => {
    const res = await httpRequest.post('/cards', {
        ...data,
    });
    return res.data.data;
};

const updateCard = async (cardId, data) => {
    return await httpRequest.put('/cards/' + cardId, {
        ...data,
    });
};

const deleteCard = async (cardId) => {
    return await httpRequest.delete('/cards/' + cardId);
};

export const cardService = { getCards, getCardDetail, getCardDetailBySlug, createNewCard, updateCard, deleteCard };
