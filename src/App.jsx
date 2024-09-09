import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import DefaultLayout from '~/layouts/DefaultLayout';
import { publicRoutes } from '~/routes';
import { mockData } from './mockData';
import { addBoardData } from './store/slides/boardSlide';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addBoardData(mockData.board));
    }, [dispatch]);

    return (
        <Box>
            <BrowserRouter>
                <Routes>
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
                </Routes>
            </BrowserRouter>
        </Box>
    );
}

export default App;
