import { domMax, LazyMotion } from 'framer-motion';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
export function MotionLazy({ children }) {
    return (
        <LazyMotion strict features={domMax}>
            {children}
        </LazyMotion>
    );
}
