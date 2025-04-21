import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { FormValidationView } from '~/sections/_examples/extra/form-validation-view';

// ----------------------------------------------------------------------

const metadata = { title: `Form validation | Components - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <FormValidationView />
        </>
    );
}
