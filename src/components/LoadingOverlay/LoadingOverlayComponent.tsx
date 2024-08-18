import React, { useEffect, useState } from 'react';
import EventBus from '../../sdk/utils/eventEmitter';
import './LoadingOverlayComponent.scss'; // Make sure to create appropriate styles

const LoadingOverlay: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleLoading = (loading: boolean) => {
            setIsLoading(loading);
        };

        EventBus.on('loading', handleLoading);

        return () => {
            EventBus.off('loading', handleLoading);
        };
    }, []);

    if (!isLoading) {
        return null;
    }

    return (
        <div className="loading-overlay">
            <div className="spinner"></div> {/* Add spinner animation in your SCSS */}
        </div>
    );
};

export default LoadingOverlay;
