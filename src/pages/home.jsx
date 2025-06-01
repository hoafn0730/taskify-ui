import { Helmet } from 'react-helmet-async';

import { HomeView } from '~/sections/home/view';

// ----------------------------------------------------------------------

const metadata = {
    title: 'Taskify: Simplify Your Project Management',
    description:
        'Streamline your workflow with Taskify - The modern Kanban board tool for efficient project management. Organize tasks, collaborate with teams, and boost productivity.',
};

export default function Page() {
    return (
        <>
            <Helmet>
                <title> {metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </Helmet>

            <HomeView />
        </>
    );
}
