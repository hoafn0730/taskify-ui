import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from '~/configs/config-global';

// ----------------------------------------------------------------------

const metadata = { title: `Blank - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <Container>
                <Typography variant="h4">Blank</Typography>
            </Container>
        </>
    );
}
