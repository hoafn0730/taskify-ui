import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { AutocompleteView } from '~/sections/_examples/mui/autocomplete-view';

// ----------------------------------------------------------------------

const metadata = { title: `Autocomplete | MUI - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <AutocompleteView />
        </>
    );
}
