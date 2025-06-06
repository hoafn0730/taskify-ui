import { paramCase } from '~/utils/change-case';

import { _id, _postTitles } from '~/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
    AUTH: '/auth',
    AUTH_DEMO: '/auth-demo',
    DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
    comingSoon: '/coming-soon',
    maintenance: '/maintenance',
    pricing: '/pricing',
    payment: '/payment',
    about: '/about-us',
    contact: '/contact-us',
    faqs: '/faqs',
    page403: '/error/403',
    page404: '/error/404',
    page500: '/error/500',
    components: '/components',
    docs: 'https://docs.taskify.cc',
    zoneStore: 'https://mui.com/store/items/zone-landing-page/',
    minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
    freeUI: 'https://mui.com/store/items/minimal-dashboard-free/',
    figma: 'https://www.figma.com/design/cAPz4pYPtQEXivqe11EcDE/%5BPreview%5D-Minimal-Web.v6.0.0',
    product: {
        root: `/product`,
        checkout: `/product/checkout`,
        details: (id) => `/product/${id}`,
        demo: { details: `/product/${MOCK_ID}` },
    },
    post: {
        root: `/post`,
        details: (title) => `/post/${paramCase(title)}`,
        demo: { details: `/post/${paramCase(MOCK_TITLE)}` },
    },
    // AUTH
    auth: {
        signIn: `${ROOTS.AUTH}/sign-in`,
        signUp: `${ROOTS.AUTH}/sign-up`,
    },
    authDemo: {
        split: {
            signIn: `${ROOTS.AUTH_DEMO}/split/sign-in`,
            signUp: `${ROOTS.AUTH_DEMO}/split/sign-up`,
            resetPassword: `${ROOTS.AUTH_DEMO}/split/reset-password`,
            updatePassword: `${ROOTS.AUTH_DEMO}/split/update-password`,
            verify: `${ROOTS.AUTH_DEMO}/split/verify`,
        },
        centered: {
            signIn: `${ROOTS.AUTH_DEMO}/centered/sign-in`,
            signUp: `${ROOTS.AUTH_DEMO}/centered/sign-up`,
            resetPassword: `${ROOTS.AUTH_DEMO}/centered/reset-password`,
            updatePassword: `${ROOTS.AUTH_DEMO}/centered/update-password`,
            verify: `${ROOTS.AUTH_DEMO}/centered/verify`,
        },
    },
    // DASHBOARD
    dashboard: {
        root: ROOTS.DASHBOARD,
        summary: `${ROOTS.DASHBOARD}/summary`,
        mail: `${ROOTS.DASHBOARD}/mail`,
        chat: `${ROOTS.DASHBOARD}/chat`,
        blank: `${ROOTS.DASHBOARD}/blank`,
        list: `${ROOTS.DASHBOARD}/list`,
        calendar: `${ROOTS.DASHBOARD}/calendar`,
        fileManager: `${ROOTS.DASHBOARD}/file-manager`,
        permission: `${ROOTS.DASHBOARD}/permission`,
        setting: `${ROOTS.DASHBOARD}/setting`,
        general: {
            app: `${ROOTS.DASHBOARD}/app`,
            ecommerce: `${ROOTS.DASHBOARD}/ecommerce`,
            analytics: `${ROOTS.DASHBOARD}/analytics`,
            banking: `${ROOTS.DASHBOARD}/banking`,
            booking: `${ROOTS.DASHBOARD}/booking`,
            file: `${ROOTS.DASHBOARD}/file`,
            course: `${ROOTS.DASHBOARD}/course`,
        },
        user: {
            root: `${ROOTS.DASHBOARD}/user`,
            new: `${ROOTS.DASHBOARD}/user/new`,
            list: `${ROOTS.DASHBOARD}/user/list`,
            cards: `${ROOTS.DASHBOARD}/user/cards`,
            profile: `${ROOTS.DASHBOARD}/user/profile`,
            account: `${ROOTS.DASHBOARD}/user/account`,
            edit: (id) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
            demo: {
                edit: `${ROOTS.DASHBOARD}/user/${MOCK_ID}/edit`,
            },
        },
        member: {
            root: `${ROOTS.DASHBOARD}/member`,
            new: `${ROOTS.DASHBOARD}/member/new`,
            list: `${ROOTS.DASHBOARD}/member/list`,
            cards: `${ROOTS.DASHBOARD}/member/cards`,
            profile: `${ROOTS.DASHBOARD}/member/profile`,
            edit: (id) => `${ROOTS.DASHBOARD}/member/${id}/edit`,
            demo: {
                edit: `${ROOTS.DASHBOARD}/member/${MOCK_ID}/edit`,
            },
        },
        product: {
            root: `${ROOTS.DASHBOARD}/product`,
            new: `${ROOTS.DASHBOARD}/product/new`,
            details: (id) => `${ROOTS.DASHBOARD}/product/${id}`,
            edit: (id) => `${ROOTS.DASHBOARD}/product/${id}/edit`,
            demo: {
                details: `${ROOTS.DASHBOARD}/product/${MOCK_ID}`,
                edit: `${ROOTS.DASHBOARD}/product/${MOCK_ID}/edit`,
            },
        },
        invoice: {
            root: `${ROOTS.DASHBOARD}/invoice`,
            new: `${ROOTS.DASHBOARD}/invoice/new`,
            details: (id) => `${ROOTS.DASHBOARD}/invoice/${id}`,
            edit: (id) => `${ROOTS.DASHBOARD}/invoice/${id}/edit`,
            demo: {
                details: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}`,
                edit: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}/edit`,
            },
        },
        post: {
            root: `${ROOTS.DASHBOARD}/post`,
            new: `${ROOTS.DASHBOARD}/post/new`,
            details: (title) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}`,
            edit: (title) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}/edit`,
            demo: {
                details: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}`,
                edit: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}/edit`,
            },
        },
        order: {
            root: `${ROOTS.DASHBOARD}/order`,
            details: (id) => `${ROOTS.DASHBOARD}/order/${id}`,
            demo: {
                details: `${ROOTS.DASHBOARD}/order/${MOCK_ID}`,
            },
        },
        job: {
            root: `${ROOTS.DASHBOARD}/job`,
            new: `${ROOTS.DASHBOARD}/job/new`,
            details: (id) => `${ROOTS.DASHBOARD}/job/${id}`,
            edit: (id) => `${ROOTS.DASHBOARD}/job/${id}/edit`,
            demo: {
                details: `${ROOTS.DASHBOARD}/job/${MOCK_ID}`,
                edit: `${ROOTS.DASHBOARD}/job/${MOCK_ID}/edit`,
            },
        },
        kanban: {
            root: `${ROOTS.DASHBOARD}/kanban`,
            new: `${ROOTS.DASHBOARD}/kanban/new`,
            details: (id) => `${ROOTS.DASHBOARD}/kanban/${id}`,
            edit: (id) => `${ROOTS.DASHBOARD}/kanban/${id}/edit`,
            demo: {
                details: `${ROOTS.DASHBOARD}/kanban/${MOCK_ID}`,
                edit: `${ROOTS.DASHBOARD}/kanban/${MOCK_ID}/edit`,
            },
        },
    },
    profile: `/:username`,
};
