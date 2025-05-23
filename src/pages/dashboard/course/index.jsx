import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/configs/config-global';

import { OverviewCourseView } from '~/sections/overview/course/view';

// ----------------------------------------------------------------------

const metadata = { title: `Course | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>

            <OverviewCourseView />
        </>
    );
}
