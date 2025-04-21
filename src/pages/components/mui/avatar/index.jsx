import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { AvatarView } from '~/sections/_examples/mui/avatar-view';

// ----------------------------------------------------------------------

const metadata = { title: `Avatar | MUI - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <AvatarView />
        </>
    );
}
