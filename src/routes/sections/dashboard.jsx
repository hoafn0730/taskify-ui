import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from '~/config-global';
import { DashboardLayout } from '~/layouts/dashboard';

import { LoadingScreen } from '~/components/loading-screen';

import { AuthGuard } from '~/auth/guard';

// ----------------------------------------------------------------------

// Overview
const IndexPage = lazy(() => import('~/pages/dashboard'));
const OverviewEcommercePage = lazy(() => import('~/pages/dashboard/ecommerce'));
const OverviewAnalyticsPage = lazy(() => import('~/pages/dashboard/analytics'));
const OverviewBankingPage = lazy(() => import('~/pages/dashboard/banking'));
const OverviewBookingPage = lazy(() => import('~/pages/dashboard/booking'));
const OverviewFilePage = lazy(() => import('~/pages/dashboard/file'));
const OverviewCoursePage = lazy(() => import('~/pages/dashboard/course'));
// Product
const ProductDetailsPage = lazy(() => import('~/pages/dashboard/product/details'));
const ProductListPage = lazy(() => import('~/pages/dashboard/product/list'));
const ProductCreatePage = lazy(() => import('~/pages/dashboard/product/new'));
const ProductEditPage = lazy(() => import('~/pages/dashboard/product/edit'));
// Order
const OrderListPage = lazy(() => import('~/pages/dashboard/order/list'));
const OrderDetailsPage = lazy(() => import('~/pages/dashboard/order/details'));
// Invoice
const InvoiceListPage = lazy(() => import('~/pages/dashboard/invoice/list'));
const InvoiceDetailsPage = lazy(() => import('~/pages/dashboard/invoice/details'));
const InvoiceCreatePage = lazy(() => import('~/pages/dashboard/invoice/new'));
const InvoiceEditPage = lazy(() => import('~/pages/dashboard/invoice/edit'));
// User
const UserProfilePage = lazy(() => import('~/pages/dashboard/user/profile'));
const UserCardsPage = lazy(() => import('~/pages/dashboard/user/cards'));
const UserListPage = lazy(() => import('~/pages/dashboard/user/list'));
const UserAccountPage = lazy(() => import('~/pages/dashboard/user/account'));
const UserCreatePage = lazy(() => import('~/pages/dashboard/user/new'));
const UserEditPage = lazy(() => import('~/pages/dashboard/user/edit'));
// Blog
const BlogPostsPage = lazy(() => import('~/pages/dashboard/post/list'));
const BlogPostPage = lazy(() => import('~/pages/dashboard/post/details'));
const BlogNewPostPage = lazy(() => import('~/pages/dashboard/post/new'));
const BlogEditPostPage = lazy(() => import('~/pages/dashboard/post/edit'));
// Job
const JobDetailsPage = lazy(() => import('~/pages/dashboard/job/details'));
const JobListPage = lazy(() => import('~/pages/dashboard/job/list'));
const JobCreatePage = lazy(() => import('~/pages/dashboard/job/new'));
const JobEditPage = lazy(() => import('~/pages/dashboard/job/edit'));

// File manager
const FileManagerPage = lazy(() => import('~/pages/dashboard/file-manager'));
// App
const ChatPage = lazy(() => import('~/pages/dashboard/chat'));
const MailPage = lazy(() => import('~/pages/dashboard/mail'));
const CalendarPage = lazy(() => import('~/pages/dashboard/calendar'));
const KanbanPage = lazy(() => import('~/pages/dashboard/kanban'));
// Test render page by role
const PermissionDeniedPage = lazy(() => import('~/pages/dashboard/permission'));
// Blank page
const ParamsPage = lazy(() => import('~/pages/dashboard/params'));
const BlankPage = lazy(() => import('~/pages/dashboard/blank'));

// ----------------------------------------------------------------------

const layoutContent = (
    <DashboardLayout>
        <Suspense fallback={<LoadingScreen />}>
            <Outlet />
        </Suspense>
    </DashboardLayout>
);

export const dashboardRoutes = [
    {
        path: 'dashboard',
        element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
        children: [
            { element: <IndexPage />, index: true },
            { path: 'analytics', element: <OverviewAnalyticsPage /> },
            { path: 'banking', element: <OverviewBankingPage /> },
            { path: 'file', element: <OverviewFilePage /> },
            {
                path: 'user',
                children: [
                    { element: <UserProfilePage />, index: true },
                    { path: 'profile', element: <UserProfilePage /> },
                    { path: 'cards', element: <UserCardsPage /> },
                    { path: 'list', element: <UserListPage /> },
                    { path: 'new', element: <UserCreatePage /> },
                    { path: ':id/edit', element: <UserEditPage /> },
                    { path: 'account', element: <UserAccountPage /> },
                ],
            },
            {
                path: 'product',
                children: [
                    { element: <ProductListPage />, index: true },
                    { path: 'list', element: <ProductListPage /> },
                    { path: ':id', element: <ProductDetailsPage /> },
                    { path: 'new', element: <ProductCreatePage /> },
                    { path: ':id/edit', element: <ProductEditPage /> },
                ],
            },
            {
                path: 'invoice',
                children: [
                    { element: <InvoiceListPage />, index: true },
                    { path: 'list', element: <InvoiceListPage /> },
                    { path: ':id', element: <InvoiceDetailsPage /> },
                    { path: ':id/edit', element: <InvoiceEditPage /> },
                    { path: 'new', element: <InvoiceCreatePage /> },
                ],
            },
            {
                path: 'post',
                children: [
                    { element: <BlogPostsPage />, index: true },
                    { path: 'list', element: <BlogPostsPage /> },
                    { path: ':title', element: <BlogPostPage /> },
                    { path: ':title/edit', element: <BlogEditPostPage /> },
                    { path: 'new', element: <BlogNewPostPage /> },
                ],
            },
            {
                path: 'job',
                children: [
                    { element: <JobListPage />, index: true },
                    { path: 'list', element: <JobListPage /> },
                    { path: ':id', element: <JobDetailsPage /> },
                    { path: 'new', element: <JobCreatePage /> },
                    { path: ':id/edit', element: <JobEditPage /> },
                ],
            },
            { path: 'file-manager', element: <FileManagerPage /> },
            { path: 'mail', element: <MailPage /> },
            { path: 'chat', element: <ChatPage /> },
            { path: 'calendar', element: <CalendarPage /> },
            { path: 'kanban', element: <KanbanPage /> },
            { path: 'kanban/:slug', element: <KanbanPage /> },
            { path: 'permission', element: <PermissionDeniedPage /> },
            { path: 'blank', element: <BlankPage /> },
        ],
    },
];
