import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function PrivateRoute({ children }) {
    // const user = useSelector((state) => state.user);
    //     const navigate = useNavigate();
    //
    //     useEffect(() => {
    //         const timeoutHandler = setTimeout(() => {
    //             navigate('/home');
    //         }, 3000);
    //
    //         return () => {
    //             clearTimeout(timeoutHandler);
    //         };
    //     }, [navigate, user]);

    return children;
}

export default PrivateRoute;
