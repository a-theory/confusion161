import { useState, useEffect } from 'react';

export function useWindowDimensions() {
    const getWindowSize = () => {
        const width = window.innerWidth
        const height = window.innerHeight
        return {
            width,
            height
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowSize());
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowSize());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

