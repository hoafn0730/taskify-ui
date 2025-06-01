import { useEffect, useCallback } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { paths } from '~/configs/paths';
import { useRouter, useSearchParams } from '~/routes/hooks';

import { useBoolean } from '~/hooks/use-boolean';
import { useResponsive } from '~/hooks/use-responsive';

import { DashboardContent } from '~/layouts/dashboard';
import { useGetMail, useGetMails, useGetLabels } from '~/actions/mail';

import { Layout } from '../layout';
import { MailNav } from '../mail-nav';
import { MailList } from '../mail-list';
import { MailHeader } from '../mail-header';
import { MailCompose } from '../mail-compose';
import { MailDetails } from '../mail-details';
import { Iconify } from '~/components/iconify';

import { MailQuickEditForm } from '../mail-quick-edit-form';

// ----------------------------------------------------------------------

const LABEL_INDEX = 'inbox';

// ----------------------------------------------------------------------

export function MailView() {
    const router = useRouter();

    const searchParams = useSearchParams();

    const selectedLabelId = searchParams.get('label') ?? LABEL_INDEX;

    const selectedMailId = searchParams.get('id') ?? '';

    const mdUp = useResponsive('up', 'md');

    const openNav = useBoolean();

    const openMail = useBoolean();

    const openCompose = useBoolean();

    const openAddMail = useBoolean();

    const { labels, labelsLoading, labelsEmpty } = useGetLabels();

    const { mails, mailsLoading, mailsError, mailsEmpty } = useGetMails(selectedLabelId);

    const { mail, mailLoading, mailError } = useGetMail(selectedMailId);

    const firstMailId = mails.allIds[0] || '';

    const handleToggleCompose = useCallback(() => {
        if (openNav.value) {
            openNav.onFalse();
        }
        openCompose.onToggle();
    }, [openCompose, openNav]);

    const handleClickLabel = useCallback(
        (labelId) => {
            if (!mdUp) {
                openNav.onFalse();
            }

            if (labelId) {
                const href =
                    labelId !== LABEL_INDEX ? `${paths.dashboard.mail}?label=${labelId}` : paths.dashboard.mail;
                router.push(href);
            }
        },
        [openNav, router, mdUp],
    );

    const handleClickMail = useCallback(
        (mailId) => {
            if (!mdUp) {
                openMail.onFalse();
            }

            const href =
                selectedLabelId !== LABEL_INDEX
                    ? `${paths.dashboard.mail}?id=${mailId}&label=${selectedLabelId}`
                    : `${paths.dashboard.mail}?id=${mailId}`;

            router.push(href);
        },
        [openMail, router, selectedLabelId, mdUp],
    );

    useEffect(() => {
        if (mailsError || mailError) {
            router.push(paths.dashboard.mail);
        }
    }, [mailError, mailsError, router]);

    useEffect(() => {
        if (!selectedMailId && firstMailId) {
            handleClickMail(firstMailId);
        }
    }, [firstMailId, handleClickMail, selectedMailId]);

    useEffect(() => {
        if (openCompose.value) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [openCompose.value]);

    return (
        <>
            <DashboardContent maxWidth={false} sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
                        Mail
                    </Typography>
                    {/* <Button
                        variant="contained"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={openAddMail.onTrue}
                    >
                        Add Mail
                    </Button> */}
                </Box>

                <Layout
                    sx={{
                        p: 1,
                        borderRadius: 2,
                        flex: '1 1 auto',
                        bgcolor: 'background.neutral',
                    }}
                    slots={{
                        header: (
                            <MailHeader
                                onOpenNav={openNav.onTrue}
                                onOpenMail={mailsEmpty ? undefined : openMail.onTrue}
                                sx={{ display: { md: 'none' } }}
                            />
                        ),
                        nav: (
                            <MailNav
                                labels={labels}
                                empty={labelsEmpty}
                                loading={labelsLoading}
                                openNav={openNav.value}
                                onCloseNav={openNav.onFalse}
                                selectedLabelId={selectedLabelId}
                                handleClickLabel={handleClickLabel}
                                onToggleCompose={handleToggleCompose}
                            />
                        ),
                        list: (
                            <MailList
                                mails={mails}
                                empty={mailsEmpty}
                                loading={mailsLoading || labelsLoading}
                                openMail={openMail.value}
                                onCloseMail={openMail.onFalse}
                                onClickMail={handleClickMail}
                                selectedLabelId={selectedLabelId}
                                selectedMailId={selectedMailId}
                            />
                        ),
                        details: (
                            <MailDetails
                                mail={mail}
                                empty={mailsEmpty}
                                loading={mailsLoading || mailLoading}
                                renderLabel={(id) => labels.filter((label) => label.id === id)[0]}
                            />
                        ),
                    }}
                />
            </DashboardContent>

            <MailQuickEditForm open={openAddMail.value} onClose={openAddMail.onFalse} />

            {openCompose.value && <MailCompose onCloseCompose={openCompose.onFalse} />}
        </>
    );
}
