import { Helmet } from 'react-helmet-async';

import { useParams } from '~/routes/hooks';

import { _jobs } from '~/_mock/_job';
import { CONFIG } from '~/config-global';

import { JobEditView } from '~/sections/job/view';

// ----------------------------------------------------------------------

const metadata = { title: `Job edit | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { id = '' } = useParams();

  const currentJob = _jobs.find((job) => job.id === id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <JobEditView job={currentJob} />
    </>
  );
}
