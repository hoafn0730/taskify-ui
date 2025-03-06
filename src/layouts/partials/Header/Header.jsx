import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useColorScheme, useMediaQuery, useTheme } from '@mui/material';
import { Vibrant } from 'node-vibrant/browser';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SyncIcon from '@mui/icons-material/Sync';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import LanguageIcon from '@mui/icons-material/Language';
import TranslateIcon from '@mui/icons-material/Translate';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

import Inbox from './Inbox';
import Menu from './Menu';
import Recent from './Recent';
import Search from './Search';
import Starred from './Starred';
import Template from './Template';
import Logo from '~/components/Logo';
import { locales } from '~/utils/i18n';
import { logout } from '~/store/actions/userAction';

const MENU_ITEMS = [
    {
        title: 'menu.login',
        href: `${import.meta.env.VITE_APP_SSO_LOGIN}?continue=${encodeURIComponent(window.location.origin)}`,
        icon: <Avatar />,
        type: 'login',
    },
    {
        title: 'menu.appearance.title',
        icon: <LanguageIcon fontSize="small" />,
        separate: true,
        children: {
            title: 'menu.appearance.title',
            data: [
                {
                    type: 'appearance',
                    code: 'light',
                    title: 'menu.appearance.light',
                    icon: <LightModeIcon fontSize="small" />,
                },
                {
                    type: 'appearance',
                    code: 'dark',
                    title: 'menu.appearance.dark',
                    icon: <DarkModeOutlinedIcon fontSize="small" />,
                },
                {
                    type: 'appearance',
                    code: 'system',
                    title: 'menu.appearance.system',
                    icon: <SettingsBrightnessIcon fontSize="small" />,
                },
            ],
        },
    },
    {
        title: 'menu.language',
        icon: <TranslateIcon fontSize="small" />,
        children: {
            title: 'menu.language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: locales['en'],
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: locales['vi'],
                },
            ],
        },
    },
    {
        title: 'menu.settings',
        to: '/settings',
        icon: <SettingsIcon fontSize="small" />,
    },
];

function Header() {
    const { t, i18n } = useTranslation('header');
    const { setMode } = useColorScheme();
    const theme = useTheme();
    const dispatch = useDispatch();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const board = useSelector((state) => state.board.activeBoard);
    const userInfo = useSelector((state) => state.user.userInfo);
    const [bgColor, setBgColor] = useState('#ffffff');

    const userMenu = [
        {
            title: 'menu.profile',
            to: '/@' + userInfo?.username,
            icon: <Avatar src={userInfo?.avatar} />,
        },
        {
            title: 'menu.switchAccounts',
            to: '/login?prompt=select_account&continue=',
            icon: <SyncIcon fontSize="small" />,
        },
        ...MENU_ITEMS.slice(1),
        {
            title: 'menu.logout',
            type: 'logout',
            icon: <LogoutIcon fontSize="small" />,
            separate: true,
        },
    ];

    useEffect(() => {
        if (board) {
            const img = new Image();
            img.crossOrigin = 'Anonymous'; // Bật CORS
            img.src = board?.image;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                const width = img.width;
                const height = img.height; // Chỉ lấy phần trên của ảnh

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height);
                const dataUrl = canvas.toDataURL('image/png');

                Vibrant.from(dataUrl)
                    .getPalette()
                    .then((palette) => {
                        setBgColor(`rgb(${palette.LightMuted.r}, ${palette.LightMuted.g}, ${palette.LightMuted.b})`);
                    });
            };
        }
    }, [board]);

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                i18n.changeLanguage(menuItem.code);
                break;
            case 'appearance':
                setMode(menuItem.code);
                break;
            case 'login':
                window.location.href = menuItem.href;
                break;
            case 'logout':
                dispatch(logout());
                break;
            default:
        }
    };

    return (
        <Box
            px={2}
            sx={{
                height: (theme) => theme.app.headerHeight,
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid',
                borderColor: 'primary.main',
                overflowX: 'auto',
                bgcolor: bgColor,
                '&::-webkit-scrollbar-track': { m: 2 },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mr: 2,
                }}
            >
                <Logo />
                {isMatch ? (
                    <>
                        <Button endIcon={<KeyboardArrowDownIcon />}>{t('more')}</Button>
                        <Button variant="outlined" sx={{ minWidth: 0, p: 0.8 }}>
                            <AddIcon fontSize="small" />
                        </Button>
                    </>
                ) : (
                    <>
                        <Recent />
                        <Starred />
                        <Template />
                        <Button variant="outlined" startIcon={<AddIcon />}>
                            {t('create')}
                        </Button>
                    </>
                )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Search />
                <Inbox />
                <Menu items={isLoggedIn ? userMenu : MENU_ITEMS} onChange={handleMenuChange} />
            </Box>
        </Box>
    );
}

export default Header;
