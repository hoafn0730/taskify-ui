import httpRequest from '~/utils/httpRequest';

const createNewMember = async (data) => {
    const res = await httpRequest.post('/members', {
        ...data,
    });

    return res;
};

const updateMember = async (memberId, data) => {
    return await httpRequest.put('/members/' + memberId, {
        ...data,
    });
};

const deleteMember = async (memberId) => {
    return await httpRequest.delete('/members/' + memberId);
};

export const memberService = { createNewMember, updateMember, deleteMember };
