import config from '~/config';
import HomeDashboardLayout from '~/layouts/HomeDashboardLayout';
import HomeLayout from '~/layouts/HomeLayout';
import Blog from '~/pages/Blog';

import Board from '~/pages/Board';
import Boards from '~/pages/Boards';
import Dashboard from '~/pages/Dashboard';
import Home from '~/pages/Home';
import Templates from '~/pages/Templates/Templates';

export const publicRoutes = [
    {
        path: config.paths.dashboard,
        component: Dashboard,
        layout: HomeDashboardLayout,
    },
    {
        path: config.paths.boards,
        component: Boards,
        layout: HomeDashboardLayout,
    },
    {
        path: config.paths.templates,
        component: Templates,
        layout: HomeDashboardLayout,
    },
    {
        path: config.paths.board,
        component: Board,
    },
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
];
