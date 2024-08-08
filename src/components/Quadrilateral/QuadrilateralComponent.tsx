import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import floorHotspot from '../../assets/images/floor-hotspot1.png'; // Import the image

const ImageContainer = styled.div<{ cursor: string }>`
  position: relative;
  width: 800px;
  height: 600px;
  background: url(${floorHotspot}) no-repeat center/cover;
  overflow: hidden;
  cursor: ${({ cursor }) => cursor}; /* Apply cursor style based on state */
`;

const Point = styled.div<{ x: number; y: number; cursor: string; selected: boolean }>`
  position: absolute;
  width: ${({ selected }) => (selected ? '15px' : '10px')};
  height: ${({ selected }) => (selected ? '15px' : '10px')};
  background-color: ${({ selected }) => (selected ? 'yellow' : 'red')}; /* Highlight color for selected point */
  border-radius: 50%;
  cursor: ${({ cursor }) => cursor}; /* Apply cursor style for the point */
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  transform: translate(-50%, -50%);
  border: ${({ selected }) => (selected ? '2px solid black' : 'none')}; /* Add border for selected point */
`;

const Line = styled.div<{ x1: number; y1: number; x2: number; y2: number }>`
  position: absolute;
  background-color: blue;
  transform-origin: 0 0;
  left: ${({ x1 }) => x1}px;
  top: ${({ y1 }) => y1}px;
  width: ${({ x1, x2, y1, y2 }) =>
        Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))}px;
  height: 2px;
  transform: ${({ x1, x2, y1, y2 }) =>
        `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`};
`;

const FilledQuadrilateral = styled.div<{ points: { x: number; y: number }[] }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 0, 0, 0.3); /* Transparent red fill */
  clip-path: ${({ points }) =>
        `polygon(${points.map((point) => `${point.x}px ${point.y}px`).join(', ')})`};
  pointer-events: none; /* Prevent this layer from blocking drag events */
`;

interface QuadrilateralProps {
    onCoordinatesChange: (points: { x: number; y: number }[]) => void; // Callback prop for coordinates
}

const Quadrilateral: React.FC<QuadrilateralProps> = ({ onCoordinatesChange }) => {
    const [points, setPoints] = useState([
        { x: 100, y: 100 },
        { x: 300, y: 100 },
        { x: 300, y: 300 },
        { x: 100, y: 300 },
    ]);

    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [cursor, setCursor] = useState('default'); // State to manage cursor style
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            if (draggingIndex !== null && containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const x = event.clientX - containerRect.left;
                const y = event.clientY - containerRect.top;

                // Ensure coordinates are within the bounds of the container
                const clampedX = Math.max(0, Math.min(x, containerRect.width));
                const clampedY = Math.max(0, Math.min(y, containerRect.height));

                setPoints((prevPoints) => {
                    const newPoints = [...prevPoints];
                    newPoints[draggingIndex] = { x: clampedX, y: clampedY };
                    return newPoints;
                });
            }
        },
        [draggingIndex]
    );

    const handleMouseUp = useCallback(() => {
        if (draggingIndex !== null) {
            setDraggingIndex(null);
            setCursor('default'); // Reset cursor style after drag
            onCoordinatesChange(points); // Notify parent with updated coordinates
            console.log("Coordinates after drag:", points);
        }
    }, [draggingIndex, points, onCoordinatesChange]);

    const handleMouseDown = (index: number) => {
        setDraggingIndex(index);
        setCursor('grabbing'); // Change cursor when dragging starts
    };

    const handleMouseEnter = (index: number) => {
        if (draggingIndex === null) {
            setCursor('pointer'); // Change cursor when hovering over a point
        }
    };

    const handleMouseLeave = () => {
        if (draggingIndex === null) {
            setCursor('default'); // Reset cursor when not hovering over a point
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    return (
        <ImageContainer ref={containerRef} cursor={cursor}>
            {points.map((point, index) => (
                <Point
                    key={index}
                    x={point.x}
                    y={point.y}
                    cursor={cursor}
                    selected={draggingIndex === index} // Apply selected styles
                    onMouseDown={() => handleMouseDown(index)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                />
            ))}
            <FilledQuadrilateral points={points} />
            <Line x1={points[0].x} y1={points[0].y} x2={points[1].x} y2={points[1].y} />
            <Line x1={points[1].x} y1={points[1].y} x2={points[2].x} y2={points[2].y} />
            <Line x1={points[2].x} y1={points[2].y} x2={points[3].x} y2={points[3].y} />
            <Line x1={points[3].x} y1={points[3].y} x2={points[0].x} y2={points[0].y} />
        </ImageContainer>
    );
};

export default Quadrilateral;
