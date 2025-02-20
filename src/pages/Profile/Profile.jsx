import { Navigate, useParams } from 'react-router-dom';

function Profile() {
    const { username } = useParams();

    if (!username.startsWith('@')) return <Navigate to={'not-found'} replace />;

    return <div>Profile</div>;
}

export default Profile;
