import { m } from 'framer-motion';
import { useMemo } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { ForbiddenIllustration } from '~/assets/illustrations';
import { varBounce, MotionContainer } from '~/components/animate';

/**
 * Forbidden access view component
 */
const ForbiddenView = ({ sx }) => (
    <Container component={MotionContainer} sx={{ textAlign: 'center', ...sx }}>
        <m.div variants={varBounce().in}>
            <Typography variant="h3" sx={{ mb: 2 }}>
                Permission denied
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                You do not have permission to access this page.
            </Typography>

            <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>
    </Container>
);

export function KanbanGuard({
    sx,
    children,
    hasContent = true,
    boardMembers = [],
    user = null,
    acceptRoles = [],
    isActive = true, // Board active status
}) {
    // Determine the current user's role in this board
    // Also check if the user's membership is active
    const currentMember = useMemo(() => {
        if (!boardMembers.length || !user?.id) return null;

        return boardMembers.find((member) => member.id === user.id && member.active);
    }, [boardMembers, user]);

    const currentRole = currentMember?.role || null;

    // Multiple permission checks
    const hasRolePermission = !acceptRoles.length || (currentRole && acceptRoles.includes(currentRole));
    const isMemberActive = !!currentMember;
    const isBoardActive = isActive;

    // User needs all three permissions
    const hasPermission = isBoardActive && hasRolePermission && isMemberActive;

    // Custom message based on the rejection reason
    const getErrorMessage = () => {
        if (!isBoardActive) {
            return 'This board is inactive or has been archived.';
        }
        if (!isMemberActive) {
            return 'Your membership to this board has been suspended or deactivated.';
        }
        return 'You do not have permission to access this board.';
    };

    if (!hasPermission) {
        return hasContent ? <ForbiddenView sx={sx} message={getErrorMessage()} /> : null;
    }

    return <>{children}</>;
}
