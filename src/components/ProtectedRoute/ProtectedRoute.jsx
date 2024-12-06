import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingSpinner from '../LoadingSpinner';

function ProtectedRoute({ children }) {
    const userInfo = useSelector((state) => state.user.userInfo);
    const isLoading = useSelector((state) => state.user.isLoading);
    const navigate = useNavigate();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setInitialized(true);
        }
    }, [isLoading]);

    useEffect(() => {
        if (initialized && !isLoading && userInfo === null) {
            navigate('/home');
        }
    }, [navigate, userInfo, isLoading, initialized]);

    if (!initialized || isLoading) {
        return <LoadingSpinner caption="Loading..." />;
    }

    return children;
}

ProtectedRoute.propTypes = { children: PropTypes.node.isRequired };

export default ProtectedRoute;
