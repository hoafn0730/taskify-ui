import Box from '@mui/material/Box';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Fragment } from 'react';

import CardDetail from '~/pages/CardDetail';
import DefaultLayout from '~/layouts/DefaultLayout';
import config from '~/config';
import { publicRoutes } from '~/routes';

function App() {
    const location = useLocation();
    const state = location.state;

    return (
        <Box>
            <Routes location={state?.backgroundLocation || location}>
                {publicRoutes.map((route, index) => {
                    let Layout = DefaultLayout;
                    const Page = route.component;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>

            {state?.backgroundLocation && (
                <Routes>
                    <Route path={config.paths.card} element={<CardDetail />} />
                </Routes>
            )}
        </Box>
    );
}

export default App;
