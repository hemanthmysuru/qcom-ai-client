import React, { useState, useRef, useEffect } from 'react';
import './ImageWithDraggableIconComponent.scss';
import CameraView from '../CameraView/CameraViewComponent';
import { calculateCamSizeBasedOnImageWidth } from '../../utils/common.util';

interface IconPosition {
    x: number;
    y: number;
}

interface IImageWithDraggableIcon {
    imgSrc: string;
    iconSizePercentage?: number; // Optional prop to adjust the size of the icon relative to the image
    cameraAngle: number;
    cameraFieldOfView: number;
    iconPosition?: IconPosition; // Prop to accept initial icon position
    onPositionChange: (position: IconPosition) => void; // Callback to send coordinates back
    isDragging?: boolean; // Optional prop to control dragging externally
}

const ImageWithDraggableIcon: React.FC<IImageWithDraggableIcon> = ({
    imgSrc,
    iconSizePercentage = 10,
    cameraAngle = 0,
    cameraFieldOfView = 0,
    iconPosition = null, // Default to null
    onPositionChange,
    isDragging = false, // External control over dragging
}) => {
    const [icon, setIcon] = useState<IconPosition | null>(iconPosition);
    const [dragging, setDragging] = useState<boolean>(isDragging);
    const [iconSize, setIconSize] = useState<{ width: number; height: number } | null>(null);
    const [camSize, setCamSize] = useState<number>(0); // New state for camera size
    const imgRef = useRef<HTMLImageElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateIconSize = () => {
            if (imgRef.current) {
                const { clientWidth } = imgRef.current;
                const size = clientWidth * (iconSizePercentage / 100);
                setIconSize({ width: size, height: size });

                // Calculate camSize using the utility function
                const calculatedCamSize = calculateCamSizeBasedOnImageWidth(clientWidth);
                setCamSize(calculatedCamSize);
            }
        };

        updateIconSize();
        window.addEventListener('resize', updateIconSize);
        return () => {
            window.removeEventListener('resize', updateIconSize);
        };
    }, [iconSizePercentage]);

    useEffect(() => {
        if (iconRef.current && iconSize) {
            const { offsetWidth: width, offsetHeight: height } = iconRef.current;
            setIconSize({ width, height });
        }
    }, [icon]);

    useEffect(() => {
        setDragging(isDragging);
    }, [isDragging]);

    const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
        if (imgRef.current && iconSize && !icon) {
            const { clientX, clientY } = event;
            const imageRect = imgRef.current.getBoundingClientRect();
            const { width, height } = iconSize;

            const x = clientX - imageRect.left - width / 2;
            const y = clientY - imageRect.top - height / 2;

            const newIconPosition = { x, y };
            setIcon(newIconPosition);
            onPositionChange(newIconPosition);
        }
    };

    const handleMouseDown = () => {
        if (isDragging) {
            setDragging(true);
        }
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (dragging && imgRef.current && iconSize) {
            const imageRect = imgRef.current.getBoundingClientRect();
            const { width, height } = iconSize;

            const x = event.clientX - imageRect.left - width / 2;
            const y = event.clientY - imageRect.top - height / 2;

            const newIconPosition = { x, y };
            setIcon(newIconPosition);
            onPositionChange(newIconPosition);
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging]);

    return (
        <div className="image-with-draggable-icon">
            <img
                src={imgSrc}
                alt="Clickable Area"
                onClick={handleClick}
                ref={imgRef}
                className="background-image"
            />
            {icon && iconSize && (
                <div
                    className="draggable-icon"
                    ref={iconRef}
                    style={{
                        left: icon.x,
                        top: icon.y,
                        // width: iconSize.width,
                        // height: iconSize.height,
                        position: 'absolute',
                        cursor: dragging ? 'pointer' : 'default',
                    }}
                    onMouseDown={handleMouseDown}
                >
                    <CameraView
                        cameraAngle={cameraAngle}
                        fieldOfView={cameraFieldOfView}
                        showPin={false}
                        camSize={camSize} // Use calculated camSize
                    />
                </div>
            )}
        </div>
    );
};

export default ImageWithDraggableIcon;
