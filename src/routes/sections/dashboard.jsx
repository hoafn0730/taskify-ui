import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from '~/configs/config-global';
import { DashboardLayout } from '~/layouts/dashboard';

import { LoadingScreen } from '~/components/loading-screen';

import { AuthGuard } from '~/auth/guard';

// Overview
const IndexPage = lazy(() => import('~/pages/dashboard'));
const OverviewSummaryPage = lazy(() => import('~/pages/dashboard/summary'));
const OverviewAnalyticsPage = lazy(() => import('~/pages/dashboard/analytics'));
const OverviewBankingPage = lazy(() => import('~/pages/dashboard/banking'));
const OverviewFilePage = lazy(() => import('~/pages/dashboard/file'));

// List
const ListPage = lazy(() => import('~/pages/dashboard/list/list'));
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
// Member
const MemberProfilePage = lazy(() => import('~/pages/dashboard/member/profile'));
const MemberCardsPage = lazy(() => import('~/pages/dashboard/member/cards'));
const MemberListPage = lazy(() => import('~/pages/dashboard/member/list'));
const MemberAccountPage = lazy(() => import('~/pages/dashboard/member/account'));
const MemberCreatePage = lazy(() => import('~/pages/dashboard/member/new'));
const MemberEditPage = lazy(() => import('~/pages/dashboard/member/edit'));
// Blog
const BlogPostsPage = lazy(() => import('~/pages/dashboard/post/list'));
const BlogPostPage = lazy(() => import('~/pages/dashboard/post/details'));
const BlogNewPostPage = lazy(() => import('~/pages/dashboard/post/new'));
const BlogEditPostPage = lazy(() => import('~/pages/dashboard/post/edit'));

// Kanban
const KanbanPage = lazy(() => import('~/pages/dashboard/kanban'));
const KanbanListPage = lazy(() => import('~/pages/dashboard/kanban/list'));
const TourCreatePage = lazy(() => import('~/pages/dashboard/kanban/new'));
const TourEditPage = lazy(() => import('~/pages/dashboard/kanban/edit'));
const AcceptInvite = lazy(() => import('~/pages/dashboard/kanban/accept-invite'));

// File manager
const FileManagerPage = lazy(() => import('~/pages/dashboard/file-manager'));
// App
const ChatPage = lazy(() => import('~/pages/dashboard/chat'));
const MailPage = lazy(() => import('~/pages/dashboard/mail'));
const CalendarPage = lazy(() => import('~/pages/dashboard/calendar'));

// Test render page by role
const PermissionDeniedPage = lazy(() => import('~/pages/dashboard/permission'));
// Blank page
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
            { path: 'summary', element: <OverviewSummaryPage /> },
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
                path: 'member',
                children: [
                    { element: <MemberProfilePage />, index: true },
                    { path: 'profile', element: <MemberProfilePage /> },
                    { path: 'cards', element: <MemberCardsPage /> },
                    { path: 'list', element: <MemberListPage /> },
                    { path: 'new', element: <MemberCreatePage /> },
                    { path: ':id/edit', element: <MemberEditPage /> },
                    { path: 'account', element: <MemberAccountPage /> },
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
                path: 'kanban',
                children: [
                    { element: <KanbanListPage />, index: true },
                    { path: 'accept-invite', element: <AcceptInvite /> },
                    { path: ':slug', element: <KanbanPage /> },
                    //
                    // { path: '::id', element: <TourDetailsPage /> },
                    { path: 'new', element: <TourCreatePage /> },
                    { path: ':id/edit', element: <TourEditPage /> },
                ],
            },

            { path: 'file-manager', element: <FileManagerPage /> },
            { path: 'mail', element: <MailPage /> },
            { path: 'chat', element: <ChatPage /> },
            { path: 'calendar', element: <CalendarPage /> },
            { path: 'list', element: <ListPage /> },
            { path: 'permission', element: <PermissionDeniedPage /> },
            { path: 'blank', element: <BlankPage /> },
        ],
    },
];
