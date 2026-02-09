/**
 * Hook Name
 * 
 * Description of what this hook does
 * 
 * Usage:
 * const { state, setState } = useHookTemplate();
 */

import { useState, useCallback } from 'react';

export const useHookTemplate = () => {
    const [state, setState] = useState<string>('');

    const handleStateChange = useCallback((newValue: string) => {
        setState(newValue);
    }, []);

    return {
        state,
        setState,
        handleStateChange,
    };
};
