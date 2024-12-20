import httpRequest from '~/utils/httpRequest';

const getCards = async () => {
    return httpRequest.get('/cards');
};

const getCardDetail = (cardId) => {
    return httpRequest.get('/cards/' + cardId);
};

const getCardDetailBySlug = (slug) => {
    return httpRequest.get('/cards/' + slug);
};

const createNewCard = async (data) => {
    const res = await httpRequest.post('/cards', {
        ...data,
    });
    return res.data.data;
};

const updateCard = (cardId, data) => {
    return httpRequest.put('/cards/' + cardId, {
        ...data,
    });
};

const deleteCard = async (cardId) => {
    return httpRequest.delete('/cards/' + cardId);
};

export const cardService = { getCards, getCardDetail, getCardDetailBySlug, createNewCard, updateCard, deleteCard };
