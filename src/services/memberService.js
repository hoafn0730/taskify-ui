import httpRequest from '~/utils/httpRequest';

const createNewMember = (data) => {
    return httpRequest.post('/members', {
        ...data,
    });
};

const updateMember = (memberId, data) => {
    return httpRequest.put('/members/' + memberId, {
        ...data,
    });
};

const deleteMember = (memberId) => {
    return httpRequest.delete('/members/' + memberId);
};

export const memberService = { createNewMember, updateMember, deleteMember };
