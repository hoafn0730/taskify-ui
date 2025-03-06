import httpRequest from '~/utils/httpRequest';

const getByShortLink = (shortLink, type) => {
    return httpRequest.get('/get-by-short-link', {
        params: {
            shortLink,
            type,
        },
    });
};

export { getByShortLink };
