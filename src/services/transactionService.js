import httpRequest from '~/utils/httpRequest';

const createNewTransaction = async (data) => {
    const res = await httpRequest.post('/transactions', {
        ...data,
    });
    return res.data;
};

const updateTransaction = (transactionId, data) => {
    return httpRequest.put('/transactions/' + transactionId, {
        ...data,
    });
};

const deleteTransaction = (transactionId) => {
    return httpRequest.delete('/transactions/' + transactionId);
};

export const transactionService = { createNewTransaction, updateTransaction, deleteTransaction };
