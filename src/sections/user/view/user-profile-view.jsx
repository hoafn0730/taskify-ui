import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';

import { paths } from '~/configs/paths';

import { useTabs } from '~/hooks/use-tabs';

import { DashboardContent } from '~/layouts/dashboard';
import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from '~/_mock';

import { Iconify } from '~/components/iconify';
import { CustomBreadcrumbs } from '~/components/custom-breadcrumbs';

import { ProfileHome } from '../profile-home';
import { ProfileCover } from '../profile-cover';
import { ProfileFriends } from '../profile-friends';
import { ProfileGallery } from '../profile-gallery';
import { ProfileFollowers } from '../profile-followers';
import { RoleBasedGuard } from '~/auth/guard';

// ----------------------------------------------------------------------

const TABS = [
    { value: 'profile', label: 'Profile', icon: <Iconify icon="solar:user-id-bold" width={24} /> },
    { value: 'followers', label: 'Followers', icon: <Iconify icon="solar:heart-bold" width={24} /> },
    {
        value: 'friends',
        label: 'Friends',
        icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
    },
    {
        value: 'gallery',
        label: 'Gallery',
        icon: <Iconify icon="solar:gallery-wide-bold" width={24} />,
    },
];

// ----------------------------------------------------------------------

export function UserProfileView() {
    const { user } = useSelector((state) => state.user);

    const [searchFriends, setSearchFriends] = useState('');

    const tabs = useTabs('profile');

    const handleSearchFriends = useCallback((event) => {
        setSearchFriends(event.target.value);
    }, []);

    return (
        <DashboardContent>
            <CustomBreadcrumbs
                heading="Profile"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'User', href: paths.dashboard.user.root },
                    { name: user?.displayName },
                ]}
                sx={{ mb: { xs: 3, md: 5 } }}
            />

            <Card sx={{ mb: 3, height: 290 }}>
                <ProfileCover
                    username={'@' + user?.username}
                    name={user?.displayName}
                    avatarUrl={user?.avatar}
                    coverUrl={_userAbout.coverUrl}
                />

                <Box
                    display="flex"
                    justifyContent={{ xs: 'center', md: 'flex-end' }}
                    sx={{
                        width: 1,
                        bottom: 0,
                        zIndex: 9,
                        px: { md: 3 },
                        position: 'absolute',
                        bgcolor: 'background.paper',
                    }}
                >
                    <Tabs value={tabs.value} onChange={tabs.onChange}>
                        {TABS.map((tab) => (
                            <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
                        ))}
                    </Tabs>
                </Box>
            </Card>

            {tabs.value === 'profile' && <ProfileHome info={_userAbout} posts={_userFeeds} />}

            {tabs.value === 'followers' && <ProfileFollowers followers={_userFollowers} />}

            {tabs.value === 'friends' && (
                <ProfileFriends
                    friends={_userFriends}
                    searchFriends={searchFriends}
                    onSearchFriends={handleSearchFriends}
                />
            )}

            {tabs.value === 'gallery' && <ProfileGallery gallery={_userGallery} />}
        </DashboardContent>
    );
}
