import React, { useState, useRef, useEffect } from 'react';
import './ZoomablePage.scss';
import floorPlan from '../../assets/svgs/floor-plan.svg';

const ZoomablePage: React.FC = () => {
    const [scale, setScale] = useState(1);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const [startTranslate, setStartTranslate] = useState({ x: 0, y: 0 });
    const [labelPosition, setLabelPosition] = useState({ x: 0.1, y: 0.1 }); // Relative position (percentage) of the label
    const [labelSize, setLabelSize] = useState(20); // Initial label size in pixels

    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const src = floorPlan;

    const handleMouseDown = (event: React.MouseEvent) => {
        setIsDragging(true);
        setStartPoint({ x: event.clientX, y: event.clientY });
        setStartTranslate(translate); // Save the current translate value at the start of the drag
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!isDragging) return;

        const deltaX = event.clientX - startPoint.x;
        const deltaY = event.clientY - startPoint.y;

        setTranslate(prev => ({
            x: startTranslate.x + deltaX / scale, // Adjust deltaX by scale
            y: startTranslate.y + deltaY / scale, // Adjust deltaY by scale
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
        setLabelPosition({ x: 0.1, y: 0.1 }); // Reset to initial percentage position
        setLabelSize(20); // Reset label size
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('resize', updateLabelPosition);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('resize', updateLabelPosition);
        };
    }, [isDragging, scale]);

    const updateLabelPosition = () => {
        if (containerRef.current && imgRef.current) {
            const containerWidth = containerRef.current.clientWidth;
            const containerHeight = containerRef.current.clientHeight;
            const imgWidth = imgRef.current.naturalWidth * scale;
            const imgHeight = imgRef.current.naturalHeight * scale;

            // Calculate new label position based on image size
            const newLabelX = (imgWidth * labelPosition.x - translate.x);
            const newLabelY = (imgHeight * labelPosition.y - translate.y);

            setLabelSize(20 * scale); // Adjust label size based on scale

            // Update the label's position in absolute terms
            setLabelPosition(prevPosition => ({
                ...prevPosition,
                x: newLabelX,
                y: newLabelY,
            }));
        }
    };

    useEffect(() => {
        updateLabelPosition(); // Update label position on component mount
    }, [scale, translate]);

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
                        cursor: isDragging ? 'grabbing' : 'grab',
                        transition: isDragging ? 'none' : 'transform 0.3s ease', // Smooth transition when not dragging
                    }}
                    ref={imgRef}
                    onMouseDown={handleMouseDown}
                />
                <div
                    className="overlay-layer"
                    style={{
                        transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
                        cursor: isDragging ? 'grabbing' : 'grab',
                        transition: isDragging ? 'none' : 'transform 0.3s ease', // Smooth transition for overlay layer
                    }}
                >
                    <label
                        className="overlay-label"
                        style={{
                            position: 'absolute',
                            top: `${labelPosition.y}px`,
                            left: `${labelPosition.x}px`,
                            transform: `translate(${labelPosition.x}px, ${labelPosition.y}px)`,
                            background: 'red',
                            color: 'white',
                            padding: `${labelSize / 4}px ${labelSize / 2}px`, // Adjust padding based on label size
                            fontSize: `${labelSize / 2}px`, // Adjust font size based on label size
                            borderRadius: '4px',
                            pointerEvents: 'none', // Prevent label from blocking interactions
                        }}
                    >
                        8
                    </label>
                </div>
            </figure>
            <div className="controls">
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
};

export default ZoomablePage;
