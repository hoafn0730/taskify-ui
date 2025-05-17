import { paths } from '~/configs/paths';
import { CONFIG } from '~/configs/config-global';

import { Label } from '~/components/label';
import { Iconify } from '~/components/iconify';
import { SvgColor } from '~/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
    job: icon('ic-job'),
    blog: icon('ic-blog'),
    chat: icon('ic-chat'),
    mail: icon('ic-mail'),
    user: icon('ic-user'),
    file: icon('ic-file'),
    lock: icon('ic-lock'),
    tour: icon('ic-tour'),
    order: icon('ic-order'),
    label: icon('ic-label'),
    blank: icon('ic-blank'),
    kanban: icon('ic-kanban'),
    folder: icon('ic-folder'),
    course: icon('ic-course'),
    banking: icon('ic-banking'),
    booking: icon('ic-booking'),
    invoice: icon('ic-invoice'),
    product: icon('ic-product'),
    calendar: icon('ic-calendar'),
    disabled: icon('ic-disabled'),
    external: icon('ic-external'),
    menuItem: icon('ic-menu-item'),
    ecommerce: icon('ic-ecommerce'),
    analytics: icon('ic-analytics'),
    dashboard: icon('ic-dashboard'),
    parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

// export const navData = [
//     /**
//      * Overview
//      */
//     {
//         subheader: 'Overview',
//         items: [
//             { title: 'App', path: paths.dashboard.root, icon: ICONS.dashboard },
//             { title: 'Analytics', path: paths.dashboard.general.analytics, icon: ICONS.analytics },
//             { title: 'Banking', path: paths.dashboard.general.banking, icon: ICONS.banking },
//             { title: 'File', path: paths.dashboard.general.file, icon: ICONS.file },
//         ],
//     },
//     /**
//      * Management
//      */
//     {
//         subheader: 'Management',
//         items: [
//             {
//                 title: 'User',
//                 path: paths.dashboard.user.root,
//                 icon: ICONS.user,
//                 children: [
//                     { title: 'Profile', path: paths.dashboard.user.root },
//                     { title: 'Cards', path: paths.dashboard.user.cards },
//                     { title: 'List', path: paths.dashboard.user.list },
//                     { title: 'Create', path: paths.dashboard.user.new },
//                     { title: 'Edit', path: paths.dashboard.user.demo.edit },
//                     { title: 'Account', path: paths.dashboard.user.account },
//                 ],
//             },
//             {
//                 title: 'Product',
//                 path: paths.dashboard.product.root,
//                 icon: ICONS.product,
//                 children: [
//                     { title: 'List', path: paths.dashboard.product.root },
//                     { title: 'Details', path: paths.dashboard.product.demo.details },
//                     { title: 'Create', path: paths.dashboard.product.new },
//                     { title: 'Edit', path: paths.dashboard.product.demo.edit },
//                 ],
//             },
//             {
//                 title: 'Invoice',
//                 path: paths.dashboard.invoice.root,
//                 icon: ICONS.invoice,
//                 children: [
//                     { title: 'List', path: paths.dashboard.invoice.root },
//                     { title: 'Details', path: paths.dashboard.invoice.demo.details },
//                     { title: 'Create', path: paths.dashboard.invoice.new },
//                     { title: 'Edit', path: paths.dashboard.invoice.demo.edit },
//                 ],
//             },
//             {
//                 title: 'Blog',
//                 path: paths.dashboard.post.root,
//                 icon: ICONS.blog,
//                 children: [
//                     { title: 'List', path: paths.dashboard.post.root },
//                     { title: 'Details', path: paths.dashboard.post.demo.details },
//                     { title: 'Create', path: paths.dashboard.post.new },
//                     { title: 'Edit', path: paths.dashboard.post.demo.edit },
//                 ],
//             },
//             {
//                 title: 'Job',
//                 path: paths.dashboard.job.root,
//                 icon: ICONS.job,
//                 children: [
//                     { title: 'List', path: paths.dashboard.job.root },
//                     { title: 'Details', path: paths.dashboard.job.demo.details },
//                     { title: 'Create', path: paths.dashboard.job.new },
//                     { title: 'Edit', path: paths.dashboard.job.demo.edit },
//                 ],
//             },
//
//             { title: 'File manager', path: paths.dashboard.fileManager, icon: ICONS.folder },
//             {
//                 title: 'Mail',
//                 path: paths.dashboard.mail,
//                 icon: ICONS.mail,
//                 info: (
//                     <Label color="error" variant="inverted">
//                         +32
//                     </Label>
//                 ),
//             },
//             { title: 'Chat', path: paths.dashboard.chat, icon: ICONS.chat },
//             { title: 'Calendar', path: paths.dashboard.calendar, icon: ICONS.calendar },
//             // {
//             //     title: 'Tour',
//             //     path: paths.dashboard.tour.root,
//             //     icon: ICONS.tour,
//             //     children: [
//             //         { title: 'List', path: paths.dashboard.tour.root },
//             //         { title: 'Details', path: paths.dashboard.tour.demo.details },
//             //         { title: 'Create', path: paths.dashboard.tour.new },
//             //         { title: 'Edit', path: paths.dashboard.tour.demo.edit },
//             //     ],
//             // },
//
//             { title: 'Kanban', path: paths.dashboard.kanban.root, icon: ICONS.kanban },
//         ],
//     },
//     /**
//      * Item State
//      */
//     {
//         subheader: 'Misc',
//         items: [
//             {
// default roles : All roles can see this entry.
// roles: ['user'] Only users can see this item.
// roles: ['admin'] Only admin can see this item.
// roles: ['admin', 'manager'] Only admin/manager can see this item.
// Reference from '~/guards/RoleBasedGuard'.
//                 title: 'Permission',
//                 path: paths.dashboard.permission,
//                 icon: ICONS.lock,
//                 roles: ['admin', 'manager'],
//                 caption: 'Only admin can see this item',
//             },
//
// {
//     title: 'Level',
//     path: '#/dashboard/menu_level',
//     icon: ICONS.menuItem,
//     children: [
//         {
//             title: 'Level 1a',
//             path: '#/dashboard/menu_level/menu_level_1a',
//             children: [
//                 {
//                     title: 'Level 2a',
//                     path: '#/dashboard/menu_level/menu_level_1a/menu_level_2a',
//                 },
//                 {
//                     title: 'Level 2b',
//                     path: '#/dashboard/menu_level/menu_level_1a/menu_level_2b',
//                     children: [
//                         {
//                             title: 'Level 3a',
//                             path: '#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3a',
//                         },
//                         {
//                             title: 'Level 3b',
//                             path: '#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3b',
//                         },
//                     ],
//                 },
//             ],
//         },
//         { title: 'Level 1b', path: '#/dashboard/menu_level/menu_level_1b' },
//     ],
// },
// {
//     title: 'Disabled',
//     path: '#disabled',
//     icon: ICONS.disabled,
//     disabled: true,
// },
// {
//     title: 'Label',
//     path: '#label',
//     icon: ICONS.label,
//     info: (
//         <Label color="info" variant="inverted" startIcon={<Iconify icon="solar:bell-bing-bold-duotone" />}>
//             NEW
//         </Label>
//     ),
// },
// {
//     title: 'Caption',
//     path: '#caption',
//     icon: ICONS.menuItem,
//     caption:
//         'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
// },
// {
//     title: 'Params',
//     path: '/dashboard/params?id=e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
//     icon: ICONS.parameter,
// },
// {
//     title: 'External link',
//     path: 'https://www.google.com/',
//     icon: ICONS.external,
//     info: <Iconify width={18} icon="prime:external-link" />,
// },
// { title: 'Blank', path: paths.dashboard.blank, icon: ICONS.blank },
//         ],
//     },
// ];

export const navData = (t) => [
    {
        subheader: t('overview.title'),
        items: [
            { title: t('overview.app'), path: paths.dashboard.root, icon: ICONS.dashboard },
            { title: t('overview.analytics'), path: paths.dashboard.general.analytics, icon: ICONS.analytics },
            { title: t('overview.banking'), path: paths.dashboard.general.banking, icon: ICONS.banking },
            { title: t('overview.file'), path: paths.dashboard.general.file, icon: ICONS.file },
        ],
    },
    {
        subheader: t('management.title'),
        items: [
            {
                title: t('management.user.title'),
                path: paths.dashboard.user.root,
                icon: ICONS.user,
                roles: ['admin', 'manager'],
                children: [
                    {
                        title: t('management.user.profile'),
                        path: paths.dashboard.user.root,
                        roles: ['admin', 'manager'],
                    },
                    { title: t('management.user.cards'), path: paths.dashboard.user.cards },
                    { title: t('management.user.list'), path: paths.dashboard.user.list },
                    { title: t('management.user.create'), path: paths.dashboard.user.new },
                    { title: t('management.user.edit'), path: paths.dashboard.user.demo.edit },
                    { title: t('management.user.account'), path: paths.dashboard.user.account },
                ],
            },
            // {
            //     title: t('management.product.title'),
            //     path: paths.dashboard.product.root,
            //     icon: ICONS.product,
            //     children: [
            //         { title: t('management.product.list'), path: paths.dashboard.product.root },
            //         { title: t('management.product.details'), path: paths.dashboard.product.demo.details },
            //         { title: t('management.product.create'), path: paths.dashboard.product.new },
            //         { title: t('management.product.edit'), path: paths.dashboard.product.demo.edit },
            //     ],
            // },
            {
                title: t('management.invoice.title'),
                path: paths.dashboard.invoice.root,
                icon: ICONS.invoice,
                children: [
                    { title: t('management.invoice.list'), path: paths.dashboard.invoice.root },
                    { title: t('management.invoice.details'), path: paths.dashboard.invoice.demo.details },
                    { title: t('management.invoice.create'), path: paths.dashboard.invoice.new },
                    { title: t('management.invoice.edit'), path: paths.dashboard.invoice.demo.edit },
                ],
            },
            {
                title: t('management.blog.title'),
                path: paths.dashboard.post.root,
                icon: ICONS.blog,
                children: [
                    { title: t('management.blog.list'), path: paths.dashboard.post.root },
                    { title: t('management.blog.details'), path: paths.dashboard.post.demo.details },
                    { title: t('management.blog.create'), path: paths.dashboard.post.new },
                    { title: t('management.blog.edit'), path: paths.dashboard.post.demo.edit },
                ],
            },
            // {
            //     title: t('management.job.title'),
            //     path: paths.dashboard.job.root,
            //     icon: ICONS.job,
            //     children: [
            //         { title: t('management.job.list'), path: paths.dashboard.job.root },
            //         { title: t('management.job.details'), path: paths.dashboard.job.demo.details },
            //         { title: t('management.job.create'), path: paths.dashboard.job.new },
            //         { title: t('management.job.edit'), path: paths.dashboard.job.demo.edit },
            //     ],
            // },
            { title: t('management.fileManager'), path: paths.dashboard.fileManager, icon: ICONS.folder },
            {
                title: t('management.mail'),
                path: paths.dashboard.mail,
                icon: ICONS.mail,
                info: (
                    <Label color="error" variant="inverted">
                        +32
                    </Label>
                ),
            },
            { title: t('management.chat'), path: paths.dashboard.chat, icon: ICONS.chat },
            // { title: t('management.calendar'), path: paths.dashboard.calendar, icon: ICONS.calendar },
            // { title: t('management.kanban'), path: paths.dashboard.kanban.root, icon: ICONS.kanban },
        ],
    },
    {
        subheader: t('misc.title'),
        items: [
            {
                title: t('misc.permission.title'),
                path: paths.dashboard.permission,
                icon: ICONS.lock,
                roles: ['admin', 'manager'],
                caption: t('misc.permission.caption'),
            },
        ],
    },
];
