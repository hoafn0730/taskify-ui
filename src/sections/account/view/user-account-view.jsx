import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useEffect, useState } from 'react';

import { paths } from '~/configs/paths';

import { useTabs } from '~/hooks/use-tabs';

import { DashboardContent } from '~/layouts/dashboard';
import { _userAbout, _userPlans, _userPayment, _userInvoices, _userAddressBook } from '~/_mock';

import { Iconify } from '~/components/iconify';
import { CustomBreadcrumbs } from '~/components/custom-breadcrumbs';

import { AccountGeneral } from '../account-general';
import { AccountBilling } from '../account-billing';
import { AccountSocialLinks } from '../account-social-links';
import { AccountNotifications } from '../account-notifications';
import { AccountChangePassword } from '../account-change-password';

import { userService } from '~/services/userService';

// ----------------------------------------------------------------------

const TABS = [
    { value: 'general', label: 'General', icon: <Iconify icon="solar:user-id-bold" width={24} /> },
    { value: 'billing', label: 'Billing', icon: <Iconify icon="solar:bill-list-bold" width={24} /> },
    {
        value: 'notifications',
        label: 'Notifications',
        icon: <Iconify icon="solar:bell-bing-bold" width={24} />,
    },
    { value: 'social', label: 'Social links', icon: <Iconify icon="solar:share-bold" width={24} /> },
    { value: 'security', label: 'Security', icon: <Iconify icon="ic:round-vpn-key" width={24} /> },
];

export function AccountView() {
    const hashTab = typeof window !== 'undefined' ? window.location.hash?.replace('#', '') : null;
    const tabs = useTabs(hashTab || 'general');
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        userService.getInvoices().then(({ data }) => {
            setInvoices(data?.data);
        });
    }, []);

    return (
        <DashboardContent>
            <CustomBreadcrumbs
                heading="Account"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'User', href: paths.dashboard.user.root },
                    { name: 'Account' },
                ]}
                sx={{ mb: { xs: 3, md: 5 } }}
            />

            <Tabs
                value={tabs.value}
                onChange={(event, newValue) => {
                    tabs.onChange(event, newValue);
                    window.location.hash = newValue;
                }}
                sx={{ mb: { xs: 3, md: 5 } }}
            >
                {TABS.map((tab) => (
                    <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
                ))}
            </Tabs>

            {tabs.value === 'general' && <AccountGeneral />}

            {tabs.value === 'billing' && <AccountBilling plans={_userPlans} invoices={invoices} />}

            {tabs.value === 'notifications' && <AccountNotifications />}

            {tabs.value === 'social' && <AccountSocialLinks socialLinks={_userAbout.socialLinks} />}

            {tabs.value === 'security' && <AccountChangePassword />}
        </DashboardContent>
    );
}
