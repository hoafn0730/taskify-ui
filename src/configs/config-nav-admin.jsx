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

export const navData = (t) => [
    {
        subheader: t('overview.title'),
        items: [
            { title: t('overview.app'), path: paths.dashboard.root, icon: ICONS.dashboard },
            // { title: t('overview.analytics'), path: paths.dashboard.general.analytics, icon: ICONS.analytics },
            // { title: t('overview.banking'), path: paths.dashboard.general.banking, icon: ICONS.banking },
            // { title: t('overview.file'), path: paths.dashboard.general.file, icon: ICONS.file },
        ],
    },
    {
        subheader: t('management.title'),
        items: [
            { title: t('management.user.title'), path: paths.dashboard.user.list, icon: ICONS.user },
            {
                title: t('management.invoice.title'),
                path: paths.dashboard.invoice.root,
                icon: ICONS.invoice,
                // children: [
                //     { title: t('management.invoice.list'), path: paths.dashboard.invoice.root },
                //     { title: t('management.invoice.details'), path: paths.dashboard.invoice.demo.details },
                //     { title: t('management.invoice.create'), path: paths.dashboard.invoice.new },
                //     { title: t('management.invoice.edit'), path: paths.dashboard.invoice.demo.edit },
                // ],
            },
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
            // { title: t('management.fileManager'), path: paths.dashboard.fileManager, icon: ICONS.folder },
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
