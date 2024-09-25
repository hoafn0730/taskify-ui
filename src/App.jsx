import Box from '@mui/material/Box';
import { Route, Routes, useLocation } from 'react-router-dom';

import DefaultLayout from '~/layouts/DefaultLayout';
import { publicRoutes } from '~/routes';
import CardDetail from './pages/CardDetail';
import config from './config';

function App() {
    let location = useLocation();

    const state = location.state;

    return (
        <Box>
            <Routes location={state?.backgroundLocation || location}>
                {publicRoutes.map((route, index) => {
                    let Layout = DefaultLayout;
                    const Page = route.component;

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
                <Route path={config.paths.card} element={<CardDetail />} />
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
