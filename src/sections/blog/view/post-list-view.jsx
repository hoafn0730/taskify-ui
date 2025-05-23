import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { paths } from '~/configs/paths';
import { RouterLink } from '~/components/router-link';

import { useDebounce } from '~/hooks/use-debounce';
import { useSetState } from '~/hooks/use-set-state';

import { orderBy } from '~/utils/helper';

import { POST_SORT_OPTIONS } from '~/_mock';
import { DashboardContent } from '~/layouts/dashboard';
import { useGetPosts, useSearchPosts } from '~/actions/blog';

import { Label } from '~/components/label';
import { Iconify } from '~/components/iconify';
import { CustomBreadcrumbs } from '~/components/custom-breadcrumbs';

import { PostSort } from '../post-sort';
import { PostSearch } from '../post-search';
import { PostListHorizontal } from '../post-list-horizontal';

// ----------------------------------------------------------------------

export function PostListView() {
    const [sortBy, setSortBy] = useState('latest');

    const [searchQuery, setSearchQuery] = useState('');

    const debouncedQuery = useDebounce(searchQuery);

    const { posts, postsLoading } = useGetPosts();

    const { searchResults, searchLoading } = useSearchPosts(debouncedQuery);

    const filters = useSetState({ publish: 'all' });

    const dataFiltered = applyFilter({ inputData: posts, filters: filters.state, sortBy });

    const handleSortBy = useCallback((newValue) => {
        setSortBy(newValue);
    }, []);

    const handleSearch = useCallback((inputValue) => {
        setSearchQuery(inputValue);
    }, []);

    const handleFilterPublish = useCallback(
        (event, newValue) => {
            filters.setState({ publish: newValue });
        },
        [filters],
    );

    return (
        <DashboardContent>
            <CustomBreadcrumbs
                heading="List"
                links={[
                    { name: 'Dashboard', href: paths.dashboard.root },
                    { name: 'Blog', href: paths.dashboard.post.root },
                    { name: 'List' },
                ]}
                action={
                    <Button
                        component={RouterLink}
                        href={paths.dashboard.post.new}
                        variant="contained"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                    >
                        New post
                    </Button>
                }
                sx={{ mb: { xs: 3, md: 5 } }}
            />

            <Stack
                spacing={3}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-end', sm: 'center' }}
                direction={{ xs: 'column', sm: 'row' }}
                sx={{ mb: { xs: 3, md: 5 } }}
            >
                <PostSearch
                    query={debouncedQuery}
                    results={searchResults}
                    onSearch={handleSearch}
                    loading={searchLoading}
                    hrefItem={(title) => paths.dashboard.post.details(title)}
                />

                <PostSort sort={sortBy} onSort={handleSortBy} sortOptions={POST_SORT_OPTIONS} />
            </Stack>

            <Tabs value={filters.state.publish} onChange={handleFilterPublish} sx={{ mb: { xs: 3, md: 5 } }}>
                {['all', 'published', 'draft'].map((tab) => (
                    <Tab
                        key={tab}
                        iconPosition="end"
                        value={tab}
                        label={tab}
                        icon={
                            <Label
                                variant={((tab === 'all' || tab === filters.state.publish) && 'filled') || 'soft'}
                                color={(tab === 'published' && 'info') || 'default'}
                            >
                                {tab === 'all' && posts.length}

                                {tab === 'published' && posts.filter((post) => post.publish === 'published').length}

                                {tab === 'draft' && posts.filter((post) => post.publish === 'draft').length}
                            </Label>
                        }
                        sx={{ textTransform: 'capitalize' }}
                    />
                ))}
            </Tabs>

            <PostListHorizontal posts={dataFiltered} loading={postsLoading} />
        </DashboardContent>
    );
}

const applyFilter = ({ inputData, filters, sortBy }) => {
    const { publish } = filters;

    if (sortBy === 'latest') {
        inputData = orderBy(inputData, ['createdAt'], ['desc']);
    }

    if (sortBy === 'oldest') {
        inputData = orderBy(inputData, ['createdAt'], ['asc']);
    }

    if (sortBy === 'popular') {
        inputData = orderBy(inputData, ['totalViews'], ['desc']);
    }

    if (publish !== 'all') {
        inputData = inputData.filter((post) => post.publish === publish);
    }

    return inputData;
};
