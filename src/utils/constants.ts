/**
 * Global Constants
 */

export const APP_NAME = 'Modern React App';

export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    TIMEOUT: 10000,
};

export const ANIMATION_CONFIG = {
    SPRING_CONFIG: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 300,
    },
    TRANSITION_DURATION: 0.3,
};
