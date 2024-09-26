import config from '~/config';
import HomeDashboardLayout from '~/layouts/HomeDashboardLayout';

import Board from '~/pages/Board';
import Boards from '~/pages/Boards';
import CardDetail from '~/pages/CardDetail';
import Home from '~/pages/Home';
import Templates from '~/pages/Templates/Templates';

export const publicRoutes = [
    {
        path: config.paths.home,
        component: Home,
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
    // {
    //     path: config.paths.card,
    //     component: CardDetail,
    // },
];
