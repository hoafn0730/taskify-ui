import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { LabelView } from '~/sections/_examples/extra/label-view';

// ----------------------------------------------------------------------

const metadata = { title: `Label | Components - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <LabelView />
        </>
    );
}
