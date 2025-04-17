import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { ChatView } from '~/sections/chat/view';

// ----------------------------------------------------------------------

const metadata = { title: `Chat | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ChatView />
    </>
  );
}
