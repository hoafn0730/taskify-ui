import config from '~/config';

import Board from '~/pages/Board';
import Home from '~/pages/Home/Home';

export const publicRoutes = [
    {
        path: config.paths.home,
        component: Home,
    },
    {
        path: config.paths.board,
        component: Board,
    },
];
