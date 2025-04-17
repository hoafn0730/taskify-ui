import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { CalendarView } from '~/sections/calendar/view';

// ----------------------------------------------------------------------

const metadata = { title: `Calendar | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CalendarView />
    </>
  );
}
