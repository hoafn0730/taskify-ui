import Box from '@mui/material/Box';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';

import config from '~/config';
import { privateRoutes, publicRoutes } from '~/routes';
import Card from '~/pages/Card';
import DefaultLayout from '~/layouts/DefaultLayout';
import ProtectedRoute from '~/components/ProtectedRoute';
import { getCurrentUser } from '~/store/actions/userAction';

function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.user);
    const state = location.state;

    useEffect(() => {
        // 🐳
        if (!userInfo) {
            dispatch(getCurrentUser());
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (Notification.permission === 'default') {
            Notification.requestPermission().then((permission) => {
                console.log(`Notification permission: ${permission}`);
            });
        }

        // document.addEventListener(
        //     'wheel',
        //     (e) => {
        //         e.preventDefault();
        //     },
        //     { passive: false },
        // );
    }, []);

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
                <Route path="/card/:slug" element={<Card />} />

                {privateRoutes.map((route, index) => {
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
                                <ProtectedRoute>
                                    <Layout>
                                        <Page />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />
                    );
                })}
            </Routes>

            {state?.backgroundLocation && (
                <Routes>
                    <Route path={config.paths.card} element={<Card />} />
                </Routes>
            )}
        </Box>
    );
}

export default App;
