import { Helmet } from 'react-helmet-async';

import { CONFIG } from '~/config-global';

import { MarkdownView } from '~/sections/_examples/extra/markdown-view';

// ----------------------------------------------------------------------

const metadata = { title: `Markdown | Components - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <MarkdownView />
    </>
  );
}
