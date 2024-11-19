import Box from '@mui/material/Box';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import CardDetail from '~/pages/CardDetail';
import DefaultLayout from '~/layouts/DefaultLayout';
import config from '~/config';
import { privateRoutes, publicRoutes } from '~/routes';
import { getCurrentUser } from './store/actions/userAction';
import PrivateRoute from './components/PrivateRoute';

const socket = io('http://localhost:5000', {
    withCredentials: true,
    extraHeaders: {
        // 'my-custom-header': 'abcd',
    },
});

function App() {
    const location = useLocation();
    const state = location.state;
    const userInfo = useSelector((state) => state.user.userInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userInfo) {
            dispatch(getCurrentUser());
        }
        // 🐳
    }, [userInfo, dispatch]);

    useEffect(() => {
        socket.on('connect', () => {
            console.log(socket.id); // x8WIv7-mJelg7on_ALbx
        });

        socket.on('hello', (arg) => {
            console.log(arg); // world
        });

        return () =>
            socket.off('hello', (arg) => {
                console.log(arg); // world
            });
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
                                <PrivateRoute>
                                    <Layout>
                                        <Page />
                                    </Layout>
                                </PrivateRoute>
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
