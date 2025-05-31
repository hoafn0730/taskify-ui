import { paths } from '~/configs/paths';

import packageJson from '../../package.json';

// ----------------------------------------------------------------------

export const CONFIG = {
    site: {
        name: 'Taskify',
        serverUrl: import.meta.env.VITE_SERVER_URL ?? '',
        assetURL: import.meta.env.VITE_ASSET_URL ?? '',
        basePath: import.meta.env.VITE_BASE_PATH ?? '',
        version: packageJson.version,
    },
    /**
     * Auth
     * @method auth local
     */
    auth: {
        method: 'auth',
        skip: false,
        redirectPath: [paths.dashboard.summary, paths.dashboard.root],
    },
    /**
     * Mapbox
     */
    mapbox: {
        apiKey: import.meta.env.VITE_MAPBOX_API_KEY ?? '',
    },
};
