import React, { useRef, useState, useEffect, MouseEvent as ReactMouseEvent } from 'react';
import './ZoomableCanvasComponent.scss';
import CameraView from '../CameraView/CameraViewComponent';
import Pin from '../Pin/PinComponent'; // Import Pin component

interface CameraViewData {
    x: number;
    y: number;
    cameraAngle?: number;
    cameraFieldOfView?: number;
    pinTxt?: string;
    showPin?: boolean;
}

interface ZoomableCanvasProps {
    imgSrc: string;
    cameraAngle?: number;
    cameraFieldOfView?: number;
    onPositionChange?: (x: number, y: number) => void;
    camCreatable?: boolean;
    cameraViewsData?: CameraViewData[];
    showAlertBoxOnPinClick?: boolean; // New prop
}

const ZoomableCanvas: React.FC<ZoomableCanvasProps> = ({
    imgSrc,
    cameraAngle,
    cameraFieldOfView,
    onPositionChange,
    camCreatable = true,
    cameraViewsData = [],
    showAlertBoxOnPinClick = false, // Default to false
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [cameraViews, setCameraViews] = useState<Array<CameraViewData>>(cameraViewsData);

    // Fixed canvas dimensions
    const canvasWidth = 1356;
    const canvasHeight = 824;

    // Load the image
    useEffect(() => {
        const img = new Image();
        img.src = imgSrc;

        img.onload = () => {
            setImage(img);
        };

        img.onerror = () => {
            console.error('Failed to load image');
        };
    }, [imgSrc]);

    useEffect(() => {
        const updateCanvasSize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.style.width = `${canvasWidth}px`;
                canvas.style.height = `${canvasHeight}px`;
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
                draw();
            }
        };

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
        };
    }, [image]);

    const draw = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx && image) {
            const imgAspectRatio = image.width / image.height;
            const canvasAspectRatio = canvasWidth / canvasHeight;

            let drawWidth, drawHeight;

            if (imgAspectRatio > canvasAspectRatio) {
                drawWidth = canvasWidth;
                drawHeight = canvasWidth / imgAspectRatio;
            } else {
                drawHeight = canvasHeight;
                drawWidth = canvasHeight * imgAspectRatio;
            }

            const xOffset = (canvasWidth - drawWidth) / 2;
            const yOffset = (canvasHeight - drawHeight) / 2;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(image, xOffset, yOffset, drawWidth, drawHeight);
        }
    };

    const handleClick = (e: ReactMouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (onPositionChange) {
                onPositionChange(x, y);
            }

            if (camCreatable) {
                if (cameraViews.length >= 1) {
                    setCameraViews(prevViews =>
                        prevViews.map((view, index) =>
                            index === 0
                                ? { ...view, x, y, cameraAngle, cameraFieldOfView }
                                : view
                        )
                    );
                } else {
                    setCameraViews(prevViews => [
                        ...prevViews,
                        { x, y, cameraAngle, cameraFieldOfView },
                    ]);
                }
            }
        }
    };

    const handleReset = () => {
        setCameraViews([]);
    };

    const handlePinClick = (view: CameraViewData) => {
        if (showAlertBoxOnPinClick) {
            alert(`Pin clicked at (${view.x}, ${view.y})`);
        }
    };

    return (
        <div className="zoomable-canvas-container">
            <canvas
                ref={canvasRef}
                className="zoomable-canvas"
                onClick={handleClick}
            />
            <div className="camera-view-overlay">
                {cameraViews.map((view, index) => (
                    <CameraView
                        key={index}
                        cameraAngle={cameraAngle ?? view.cameraAngle ?? 0}
                        fieldOfView={cameraFieldOfView ?? view.cameraFieldOfView ?? 0}
                        showPin={view.showPin ?? false}
                        pinTxt={view.pinTxt ?? "10"}
                        camSize={42} // Pass dynamic size if needed
                        style={{
                            position: 'absolute',
                            left: `${view.x}px`,
                            top: `${view.y}px`,
                            transform: 'translate(-50%, -50%)',
                        }}
                        onPinClick={() => handlePinClick(view)} // Pass click handler
                    />
                ))}
            </div>
            {/* <div className="zoom-controls">
                <button onClick={handleReset}>Reset</button>
            </div> */}
        </div>
    );
};

export default ZoomableCanvas;
