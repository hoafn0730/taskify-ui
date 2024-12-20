import config from '~/config';
import HomeLayout from '~/layouts/HomeLayout';
import DashboardLayout from '~/layouts/DashboardLayout';

import Blog from '~/pages/Blog';
import Home from '~/pages/Home';
import Board from '~/pages/Board';
import Boards from '~/pages/Boards';
import Dashboard from '~/pages/Dashboard';
import Invite from '~/pages/Invite';
import Templates from '~/pages/Templates';
import NotFound from '~/pages/NotFound';

const publicRoutes = [
    {
        path: config.paths.home,
        component: Home,
        layout: HomeLayout,
    },
    {
        path: config.paths.blog,
        component: Blog,
        layout: HomeLayout,
    },
    {
        path: config.paths.notFound,
        component: NotFound,
        layout: null,
    },
];

const privateRoutes = [
    {
        path: config.paths.dashboard,
        component: Dashboard,
        layout: DashboardLayout,
    },
    {
        path: config.paths.boards,
        component: Boards,
        layout: DashboardLayout,
    },
    {
        path: config.paths.templates,
        component: Templates,
        layout: DashboardLayout,
    },
    {
        path: config.paths.board,
        component: Board,
    },
    {
        path: config.paths.invite,
        component: Invite,
    },
];

export { publicRoutes, privateRoutes };
