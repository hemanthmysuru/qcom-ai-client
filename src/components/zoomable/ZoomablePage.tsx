import React, { useState, useRef, useEffect } from 'react';
import './ZoomablePage.scss';
import floorPlan from '../../assets/svgs/floor-plan.svg';
import CustomButton from '../CustomButton/CustomButtonComponent';
import SvgIcon from '../SvgIcons/SvgIconComponent';
import CameraView from '../CameraView/CameraViewComponent';

interface IComponentProps {
    component: React.ReactNode;
    position: { x: string; y: string }; // Position in percentage
}

interface IDraggableComponentProps {
    component: React.ReactNode;
    cameraAngle: number;
    fieldOfView: number;
}

interface ZoomablePageProps {
    components: IComponentProps[]; // Array of components with positions
    draggableComponent?: IDraggableComponentProps;
    showZoomControls?: boolean;
    isImageDraggable?: boolean;
    isCamCreationAllowed?: boolean; // Flag to control component creation
    // children?: React.ReactNode; // The component to be added
    onComponentPositionChange?: (position: { x: string; y: string }) => void; // Callback for component position
}

const ZoomablePage: React.FC<ZoomablePageProps> = ({
    components,
    draggableComponent,
    showZoomControls = false,
    isImageDraggable = false,
    isCamCreationAllowed = true,
    // children,
    onComponentPositionChange,
}) => {
    const [scale, setScale] = useState(1);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const [startTranslate, setStartTranslate] = useState({ x: 0, y: 0 });
    const [currentComponent, setCurrentComponent] = useState<IComponentProps | null>(null);

    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const src = floorPlan;

    const handleMouseDown = (event: React.MouseEvent) => {
        if (!isImageDraggable) return;
        event.preventDefault(); // Prevent native drag behavior
        setIsDragging(true);
        setStartPoint({ x: event.clientX, y: event.clientY });
        setStartTranslate(translate);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!isDragging) return;

        const deltaX = event.clientX - startPoint.x;
        const deltaY = event.clientY - startPoint.y;

        setTranslate(prev => ({
            x: startTranslate.x + deltaX / scale,
            y: startTranslate.y + deltaY / scale,
        }));
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleZoomIn = () => {
        setScale(prevScale => prevScale + 0.1);
    };

    const handleZoomOut = () => {
        setScale(prevScale => Math.max(prevScale - 0.1, 1));
    };

    const handleReset = () => {
        setScale(1);
        setTranslate({ x: 0, y: 0 });
    };

    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent native drag behavior
        event.stopPropagation(); // Stop event bubbling

        if (!isCamCreationAllowed || !draggableComponent?.component) return;

        const rect = imgRef.current?.getBoundingClientRect();
        if (!rect) return;

        const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
        const yPercent = ((event.clientY - rect.top) / rect.height) * 100;

        const updatedPosition = { x: `${xPercent}%`, y: `${yPercent}%` };
        if (currentComponent) {
            // Update existing component
            setCurrentComponent(prev => prev ? { ...prev, position: updatedPosition } : null);

            // Notify parent about the updated position
            if (onComponentPositionChange) {
                onComponentPositionChange(updatedPosition);
            }
        } else {
            // Create new component
            setCurrentComponent({
                component: draggableComponent?.component,
                position: updatedPosition
            });

            // Notify parent about the new position
            if (onComponentPositionChange) {
                onComponentPositionChange(updatedPosition);
            }
        }
    };

    const startMovingComponent = (event: React.MouseEvent, component: IComponentProps) => {
        event.preventDefault(); // Prevent native drag behavior
        event.stopPropagation(); // Prevent click event bubbling
        const rect = imgRef.current?.getBoundingClientRect();
        if (!rect) return;

        const moveHandler = (e: MouseEvent) => {
            const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
            const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

            setCurrentComponent({
                ...component,
                position: { x: `${xPercent}%`, y: `${yPercent}%` },
            });
        };

        const stopMoveHandler = () => {
            window.removeEventListener('mousemove', moveHandler);
            window.removeEventListener('mouseup', stopMoveHandler);

            if (currentComponent && onComponentPositionChange) {
                onComponentPositionChange(currentComponent.position);
            }
        };

        window.addEventListener('mousemove', moveHandler);
        window.addEventListener('mouseup', stopMoveHandler);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div className="zoomable-image-container" ref={containerRef}>
            <figure className="zoomable-figure">
                <img
                    src={src}
                    alt="Zoomable"
                    className="zoomable-image"
                    draggable={false}
                    style={{
                        transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
                        cursor: isDragging ? 'grabbing' : isImageDraggable ? 'grab' : 'default',
                        transition: isDragging ? 'none' : 'transform 0.3s ease',
                    }}
                    ref={imgRef}
                    onMouseDown={handleMouseDown}
                    onClick={handleClick}
                />
                <div
                    className="overlay-layer"
                    style={{
                        transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
                        cursor: isDragging ? 'grabbing' : isImageDraggable ? 'grab' : 'default',
                        transition: isDragging ? 'none' : 'transform 0.3s ease',
                    }}
                >
                    {components.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                position: 'absolute',
                                top: item.position.y, // Positioning in percentage
                                left: item.position.x, // Positioning in percentage
                                transform: `translate(-50%, -50%)`, // Center the component
                                pointerEvents: 'auto', // Make the components interactable if needed
                            }}
                        >
                            {item.component}
                        </div>
                    ))}
                    {currentComponent && (
                        <div
                            className="movable-component"
                            style={{
                                position: 'absolute',
                                top: currentComponent.position.y,
                                left: currentComponent.position.x,
                                transform: `translate(-50%, -50%)`,
                                pointerEvents: 'auto',
                            }}
                            onMouseDown={(e) => startMovingComponent(e, currentComponent)}
                        >
                            {/* {currentComponent.component} */}
                            {/* {movableComponentRenderer(100, 200, false)} */}
                            {draggableComponent && (
                                draggableComponent.component
                            )}
                        </div>
                    )}
                </div>
            </figure>
            {showZoomControls && (
                <div className="controls">
                    <CustomButton
                        icon={<SvgIcon name='zoomIn' width={16} height={16} />}
                        variant='contained'
                        onClick={handleZoomIn} />
                    <CustomButton
                        icon={<SvgIcon name='zoomOut' width={16} height={16} />}
                        variant='contained'
                        onClick={handleZoomOut} />
                    <CustomButton
                        icon={<SvgIcon name='reset' width={16} height={16} />}
                        variant='contained'
                        onClick={handleReset} />
                </div>
            )}
        </div>
    );
};

export default ZoomablePage;
