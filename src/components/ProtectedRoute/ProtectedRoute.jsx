import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function ProtectedRoute({ children }) {
    const { userInfo, isLoading } = useSelector((state) => state.user);

    if (isLoading) {
        return <LoadingSpinner caption="Loading..." />;
    }

    if (!userInfo && !isLoading) return <Navigate to={'/home'} replace />;

    return children;
}

ProtectedRoute.propTypes = { children: PropTypes.node.isRequired };

export default ProtectedRoute;
