/**
 * Utility Functions and Constants
 */

/**
 * Delay function for async operations
 */
export const delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Classname utility for conditional CSS classes
 */
export const classNames = (...classes: (string | undefined | null | boolean)[]): string => {
    return classes.filter(Boolean).join(' ');
};

/**
 * Local Storage utilities
 */
export const storageUtils = {
    getItem: <T,>(key: string, defaultValue?: T): T | null => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue ?? null;
        } catch (error) {
            console.error(`Error reading from localStorage: ${key}`, error);
            return defaultValue ?? null;
        }
    },
    setItem: <T,>(key: string, value: T): void => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error writing to localStorage: ${key}`, error);
        }
    },
    removeItem: (key: string): void => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing from localStorage: ${key}`, error);
        }
    },
};
