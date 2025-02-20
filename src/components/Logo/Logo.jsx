import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg';

import Link from '~/components/Link/Link';
import config from '~/config';

function Logo({ to }) {
    return (
        <Link
            to={to || config.paths.dashboard}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                textDecoration: 'none',
            }}
        >
            <SvgIcon component={TrelloIcon} inheritViewBox />
            <Typography
                variant="span"
                sx={{
                    fontWeight: 'bold',
                    fontSize: '1rem',
                }}
            >
                TaskFlow
            </Typography>
        </Link>
    );
}

Logo.propTypes = {
    to: PropTypes.string,
};

export default Logo;
