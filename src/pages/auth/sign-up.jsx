import { Helmet } from 'react-helmet-async'

import { CONFIG } from '~/config-global'

import { SignUpView } from '~/sections/auth'

// ----------------------------------------------------------------------

const metadata = { title: `Sign up | ${CONFIG.site.name}` }

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <SignUpView />
        </>
    )
}
