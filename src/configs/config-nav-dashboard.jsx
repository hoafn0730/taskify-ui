import { paths } from '~/configs/paths';
import { CONFIG } from '~/configs/config-global';

import { Label } from '~/components/label';
import { Iconify } from '~/components/iconify';
import { SvgColor } from '~/components/svg-color';

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
    job: icon('ic-job'),
    blog: icon('ic-blog'),
    chat: icon('ic-chat'),
    mail: icon('ic-mail'),
    user: icon('ic-user'),
    member: <Iconify icon="solar:users-group-rounded-bold-duotone" />,
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
    list: <Iconify icon="ic:round-view-list" />,
};

export const navData = (t) => [
    {
        subheader: t('overview.title'),
        items: [{ title: t('overview.summary'), path: paths.dashboard.summary, icon: ICONS.dashboard }],
    },
    {
        subheader: t('management.title'),
        items: [
            { title: t('management.member.title'), path: paths.dashboard.member.list, icon: ICONS.member },
            // {
            //     title: t('management.member.title'),
            //     path: paths.dashboard.member.root,
            //     icon: ICONS.member,
            //     children: [
            //         { title: t('management.member.profile'), path: paths.dashboard.member.root },
            //         { title: t('management.member.cards'), path: paths.dashboard.member.cards },
            //         { title: t('management.member.list'), path: paths.dashboard.member.list },
            //         { title: t('management.member.create'), path: paths.dashboard.member.new },
            //         { title: t('management.member.edit'), path: paths.dashboard.member.demo.edit },
            //     ],
            // },
            {
                title: t('management.blog.title'),
                path: paths.dashboard.post.root,
                icon: ICONS.blog,
                // children: [
                //     { title: t('management.blog.list'), path: paths.dashboard.post.root },
                //     { title: t('management.blog.details'), path: paths.dashboard.post.demo.details },
                //     { title: t('management.blog.create'), path: paths.dashboard.post.new },
                //     { title: t('management.blog.edit'), path: paths.dashboard.post.demo.edit },
                // ],
            },
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
            { title: t('management.kanban'), path: paths.dashboard.kanban.root, icon: ICONS.kanban },
            { title: t('management.calendar'), path: paths.dashboard.calendar, icon: ICONS.calendar },
            { title: t('management.list'), path: paths.dashboard.list, icon: ICONS.list },
        ],
    },
    // {
    //     subheader: t('misc.title'),
    //     items: [
    //         {
    //             title: t('misc.permission.title'),
    //             path: paths.dashboard.permission,
    //             icon: ICONS.lock,
    //             roles: ['admin', 'manager'],
    //             caption: t('misc.permission.caption'),
    //         },
    //     ],
    // },
];
