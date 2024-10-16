import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function Member({ member, actions }) {
    const user = useSelector((state) => state.user.userInfo);

    return (
        <ListItem sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar alt={member?.user?.fullName} src={member.user.avatar} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="span">
                        {member?.user?.fullName} {user?.id === +member?.user?.uid && '(you)'}
                    </Typography>
                    <Typography variant="span" sx={{ fontSize: '12px' }}>
                        @{member?.user?.username}
                    </Typography>
                </Box>
            </Box>
            <Box>{actions}</Box>
        </ListItem>
    );
}

Member.propTypes = {
    member: PropTypes.object,
    actions: PropTypes.node,
};

export default Member;
