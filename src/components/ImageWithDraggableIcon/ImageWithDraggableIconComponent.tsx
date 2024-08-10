import React, { useState, useRef, useEffect } from 'react';
import './ImageWithDraggableIconComponent.scss';
import CameraView from '../CameraView/CameraViewComponent';

interface IconPosition {
    x: number;
    y: number;
}

interface IImageWithDraggableIcon {
    imgSrc: string;
    iconSizePercentage?: number; // Optional prop to adjust the size of the icon relative to the image
    cameraAngle: number;
    cameraFieldOfView: number;
    onPositionChange: (position: IconPosition) => void; // Callback to send coordinates back
}

const ImageWithDraggableIcon: React.FC<IImageWithDraggableIcon> = ({ imgSrc, iconSizePercentage = 10, cameraAngle = 0, cameraFieldOfView = 0, onPositionChange }) => {
    const [icon, setIcon] = useState<IconPosition | null>(null);
    const [dragging, setDragging] = useState<boolean>(false);
    const [iconSize, setIconSize] = useState<{ width: number; height: number } | null>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateIconSize = () => {
            if (imgRef.current) {
                const { clientWidth } = imgRef.current;
                const size = clientWidth * (iconSizePercentage / 100);
                setIconSize({ width: size, height: size });
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

    const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
        if (imgRef.current && iconSize) {
            const { clientX, clientY } = event;
            const imageRect = imgRef.current.getBoundingClientRect();
            const { width, height } = iconSize;

            const x = clientX - imageRect.left - (width / 2);
            const y = clientY - imageRect.top - (height / 2);

            const newIconPosition = { x, y };
            setIcon(newIconPosition);
            onPositionChange(newIconPosition); // Send the coordinates back to the parent component
        }
    };

    const handleMouseDown = () => {
        setDragging(true);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (dragging && imgRef.current && iconSize) {
            const imageRect = imgRef.current.getBoundingClientRect();
            const { width, height } = iconSize;

            const x = event.clientX - imageRect.left - (width / 2);
            const y = event.clientY - imageRect.top - (height / 2);

            const newIconPosition = { x, y };
            setIcon(newIconPosition);
            onPositionChange(newIconPosition); // Send the coordinates back to the parent component
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
                        position: 'absolute',
                    }}
                    onMouseDown={handleMouseDown}
                >
                    <CameraView cameraAngle={cameraAngle} fieldOfView={cameraFieldOfView} showPin={false} />
                </div>
            )}
        </div>
    );
};

export default ImageWithDraggableIcon;
