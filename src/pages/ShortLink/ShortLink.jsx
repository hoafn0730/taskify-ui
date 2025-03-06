import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '~/components/LoadingSpinner';
import { getByShortLink } from '~/services';

function ShortLink() {
    const { shortLink } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let type;
        if (location.pathname.includes('/b/')) {
            type = 'board';
        } else if (location.pathname.includes('/c/')) {
            type = 'card';
        }

        //  get by shortLink
        getByShortLink(shortLink, type).then((res) => navigate(`/${type}/${res.data?.slug}`, { replace: true }));
    }, [navigate, shortLink]);

    return <LoadingSpinner caption="" />;
}

export default ShortLink;
