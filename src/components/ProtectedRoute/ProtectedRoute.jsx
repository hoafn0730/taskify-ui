import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function ProtectedRoute({ children }) {
    const userInfo = useSelector((state) => state.user.userInfo);
    const isLoading = useSelector((state) => state.user.isLoading);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setInitialized(true);
        }
    }, [isLoading]);

    if (isLoading) {
        return <LoadingSpinner caption="Loading..." />;
    }

    if (initialized && !userInfo && !isLoading) return <Navigate to={'/home'} replace />;

    return children;
}

ProtectedRoute.propTypes = { children: PropTypes.node.isRequired };

export default ProtectedRoute;
