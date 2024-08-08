import { useEffect, useRef, useState } from 'react';
import floorPlan from '../../assets/images/floor-plan.png';
import CustomButton from '../CustomButton/CustomButtonComponent';
import SvgIcon from '../SvgIcons/SvgIconComponent';
import './FloorPlanComponent.scss';
import CameraView from '../CameraView/CameraViewComponent';

interface IfloorPlan {
    showZoomAction: boolean;
    showFullScreenAction: boolean;
}

const FloorPlan: React.FC<IfloorPlan> = ({ showZoomAction, showFullScreenAction }) => {
    const [scale, setScale] = useState<number>(1);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState<boolean>(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

    // Zoom functions
    const handleZoomIn = () => setScale(prevScale => prevScale * 1.2);
    const handleZoomOut = () => setScale(prevScale => Math.max(prevScale * 0.8, 0.1));
    const handleReset = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
        if (document.fullscreenElement) {
            document.exitFullscreen();
            setIsFullScreen(false);
        }
    };

    // Fullscreen functions
    const toggleFullScreen = () => {
        if (isFullScreen) {
            document.exitFullscreen();
        } else if (imgRef.current) {
            const img = imgRef.current as HTMLImageElement & {
                webkitRequestFullscreen?: () => Promise<void>;
                mozRequestFullScreen?: () => Promise<void>;
                msRequestFullscreen?: () => Promise<void>;
            };

            if (img.requestFullscreen) {
                img.requestFullscreen();
            } else if (img.webkitRequestFullscreen) {
                img.webkitRequestFullscreen();
            } else if (img.mozRequestFullScreen) {
                img.mozRequestFullScreen();
            } else if (img.msRequestFullscreen) {
                img.msRequestFullscreen();
            }
        }
    };

    const handleFullScreenChange = () => setIsFullScreen(Boolean(document.fullscreenElement));
    const handleKeyup = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            document.exitFullscreen();
        }
    };

    // Drag functions
    const startDrag = (clientX: number, clientY: number) => {
        setDragging(true);
        setLastMousePosition({ x: clientX, y: clientY });
    };

    const handleMove = (clientX: number, clientY: number) => {
        if (dragging) {
            const deltaX = clientX - lastMousePosition.x;
            const deltaY = clientY - lastMousePosition.y;

            setPosition(prevPosition => ({
                x: prevPosition.x + deltaX,
                y: prevPosition.y + deltaY
            }));

            setLastMousePosition({ x: clientX, y: clientY });
        }
    };

    const endDrag = () => {
        setDragging(false);
    };

    // Mouse events
    const handleMouseDown = (event: React.MouseEvent) => startDrag(event.clientX, event.clientY);
    const handleMouseMove = (event: React.MouseEvent) => handleMove(event.clientX, event.clientY);
    const handleMouseUp = () => endDrag();
    const handleMouseLeave = () => endDrag();

    // Touch events
    const handleTouchStart = (event: React.TouchEvent) => {
        if (event.touches.length > 0) {
            const { clientX, clientY } = event.touches[0];
            startDrag(clientX, clientY);
        }
    };

    const handleTouchMove = (event: React.TouchEvent) => {
        if (event.touches.length > 0) {
            const { clientX, clientY } = event.touches[0];
            handleMove(clientX, clientY);
        }
    };

    const handleTouchEnd = () => endDrag();

    // Double-click to enable dragging
    const handleDoubleClick = () => setDragging(true);

    // Clean up listeners on unmount
    useEffect(() => {
        document.addEventListener('fullscreenchange', handleFullScreenChange);
        document.addEventListener('keyup', handleKeyup);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
            document.removeEventListener('keyup', handleKeyup);
        };
    }, []);

    return (
        <section className="floor-plan">
            <div
                ref={containerRef}
                className='floor-plan__image-container'
                style={{
                    transform: `scale(${scale})`,
                    transition: 'transform 0.3s ease',
                    cursor: dragging ? 'grabbing' : 'grab',
                    overflow: 'hidden'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onDoubleClick={handleDoubleClick}
            >
                <img
                    ref={imgRef}
                    src={floorPlan}
                    alt="floor plan"
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transition: dragging ? 'none' : 'transform 0.3s ease'
                    }}
                />
                <CameraView cameraAngle={295} fieldOfView={180} />
            </div>

            <aside className="actions">
                {showZoomAction && (
                    <>
                        <CustomButton
                            icon={<SvgIcon name='zoomIn' width={16} height={16} />}
                            variant='contained'
                            onClick={handleZoomIn} />
                        <CustomButton
                            icon={<SvgIcon name='zoomOut' width={16} height={16} />}
                            variant='contained'
                            onClick={handleZoomOut} />
                    </>
                )}
                {showFullScreenAction && (
                    <CustomButton
                        icon={
                            isFullScreen ? <SvgIcon name='minimize' width={16} height={16} /> :
                                <SvgIcon name='maximize' width={16} height={16} />
                        }
                        variant='contained'
                        onClick={toggleFullScreen} />
                )}
                <CustomButton
                    icon={<SvgIcon name='reset' width={16} height={16} />}
                    variant='contained'
                    onClick={handleReset} />
            </aside>
        </section>
    );
};

export default FloorPlan;
