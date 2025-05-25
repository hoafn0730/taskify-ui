import { paths } from '~/configs/paths';

import { CONFIG } from '~/configs/config-global';

import { Iconify } from '~/components/iconify';

export const navData = (t) => [
    {
        title: t('header.navigation.home'),
        path: '/',
        icon: <Iconify width={22} icon="solar:home-2-bold-duotone" />,
    },
    {
        title: t('header.navigation.pages'),
        path: '/pages',
        icon: <Iconify width={22} icon="solar:file-bold-duotone" />,
        children: [
            {
                subheader: t('pages.other.title'),
                items: [
                    { title: t('pages.other.aboutUs'), path: paths.about },
                    { title: t('pages.other.contactUs'), path: paths.contact },
                    { title: t('pages.other.faqs'), path: paths.faqs },
                    { title: t('pages.other.pricing'), path: paths.pricing },
                    { title: t('pages.other.payment'), path: paths.payment },
                    { title: t('pages.other.maintenance'), path: paths.maintenance },
                    { title: t('pages.other.comingSoon'), path: paths.comingSoon },
                ],
            },
            {
                subheader: t('pages.concepts.title'),
                items: [
                    { title: t('pages.concepts.shop'), path: paths.product.root },
                    { title: t('pages.concepts.product'), path: paths.product.demo.details },
                    { title: t('pages.concepts.checkout'), path: paths.product.checkout },
                    { title: t('pages.concepts.posts'), path: paths.post.root },
                    { title: t('pages.concepts.post'), path: paths.post.demo.details },
                ],
            },
            {
                subheader: t('pages.authDemo.title'),
                items: [
                    { title: t('pages.authDemo.signIn'), path: paths.authDemo.split.signIn },
                    { title: t('pages.authDemo.signUp'), path: paths.authDemo.split.signUp },
                    { title: t('pages.authDemo.resetPassword'), path: paths.authDemo.split.resetPassword },
                    { title: t('pages.authDemo.updatePassword'), path: paths.authDemo.split.updatePassword },
                    { title: t('pages.authDemo.verify'), path: paths.authDemo.split.verify },
                    { title: t('pages.authDemo.signInCentered'), path: paths.authDemo.centered.signIn },
                    { title: t('pages.authDemo.signUpCentered'), path: paths.authDemo.centered.signUp },
                    {
                        title: t('pages.authDemo.resetPasswordCentered'),
                        path: paths.authDemo.centered.resetPassword,
                    },
                    {
                        title: t('pages.authDemo.updatePasswordCentered'),
                        path: paths.authDemo.centered.updatePassword,
                    },
                    { title: t('pages.authDemo.verifyCentered'), path: paths.authDemo.centered.verify },
                ],
            },
            {
                subheader: t('pages.error.title'),
                items: [
                    { title: t('pages.error.page403'), path: paths.page403 },
                    { title: t('pages.error.page404'), path: paths.page404 },
                    { title: t('pages.error.page500'), path: paths.page500 },
                ],
            },
            {
                subheader: t('pages.dashboard.title'),
                items: [
                    {
                        title: t('pages.dashboard.dashboard'),
                        path: CONFIG.auth.redirectPath,
                    },
                ],
            },
        ],
    },
];
