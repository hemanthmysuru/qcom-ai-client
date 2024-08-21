import React, { useEffect } from 'react';
import Pin from '../Pin/PinComponent';
import SvgIcon, { iconNameTypes } from '../SvgIcons/SvgIconComponent';
import './CameraViewComponent.scss';

interface ICameraView {
    cameraAngle: number;
    fieldOfView: number;
    showPin?: boolean;
    pinTxt?: string;
    camSize?: number;
    svgIconName?: iconNameTypes;
    style?: React.CSSProperties;
    onPinClick?: () => void; // New prop
}

const CameraView: React.FC<ICameraView> = ({
    cameraAngle,
    fieldOfView,
    showPin = true,
    pinTxt = '10',
    camSize = 42,
    style,
    onPinClick // New prop
}) => {
    // Ensure cameraAngle and fieldOfView are within the 0 to 359 range
    const validatedCameraAngle = Math.max(0, Math.min(cameraAngle, 360));
    const validatedFieldOfView = Math.max(0, Math.min(fieldOfView, 360));

    // Calculate sizes based on camSize
    const camCoverageSize = camSize * 3;
    const camIconSize = camSize / 3;

    // Utility function to set custom properties
    const getCustomProperties = (angle: number, fov: number): React.CSSProperties => ({
        '--camera-angle': `${angle}deg`,
        '--field-of-view-angle': `${fov}deg`,
    }) as React.CSSProperties;

    // Styles as constants
    const coverageStyles: React.CSSProperties = {
        width: `${camCoverageSize}px`,
        height: `${camCoverageSize}px`,
        ...getCustomProperties(cameraAngle, fieldOfView),
    };

    const cameraStyles: React.CSSProperties = {
        width: `${camSize}px`,
        height: `${camSize}px`,
        transform: `rotate(${validatedCameraAngle}deg)`,
    };

    const iconStyles: React.CSSProperties = {
        width: `${camIconSize}px`,
        height: `${camIconSize}px`,
    };

    return (
        <section className="camera-view" style={style}>
            <aside className="coverage" style={coverageStyles}>
                <figure className="camera" style={cameraStyles}>
                    <SvgIcon name='camera' width={camIconSize} height={camIconSize} />
                </figure>
            </aside>
            {showPin && <Pin text={pinTxt} iconSize={camIconSize * 4} onClick={onPinClick} />}
        </section>
    );
}

export default CameraView;
