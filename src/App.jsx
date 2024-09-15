import Box from '@mui/material/Box';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DefaultLayout from '~/layouts/DefaultLayout';
import { publicRoutes } from '~/routes';

function App() {
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
