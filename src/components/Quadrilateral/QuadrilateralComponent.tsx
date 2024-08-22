import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { isNullishCoalesce } from 'typescript';

const MediaContainer = styled.div<{ cursor: string }>`
  position: relative;
  width: 800px;
  height: 600px;
  overflow: hidden;
  cursor: ${({ cursor }) => cursor};
`;

const MediaElement = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
`;

const Point = styled.div<{ x: number; y: number; cursor: string; selected: boolean }>`
  position: absolute;
  width: ${({ selected }) => (selected ? '15px' : '10px')};
  height: ${({ selected }) => (selected ? '15px' : '10px')};
  background-color: ${({ selected }) => (selected ? 'yellow' : 'red')};
  border-radius: 50%;
  cursor: ${({ cursor }) => cursor};
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  transform: translate(-50%, -50%);
  border: ${({ selected }) => (selected ? '2px solid black' : 'none')};
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
  background-color: rgba(255, 0, 0, 0.3);
  clip-path: ${({ points }) =>
        `polygon(${points.map((point) => `${point.x}px ${point.y}px`).join(', ')})`};
  pointer-events: none;
`;

export const defaultCoordinateList = [
    { x: 100, y: 100 },
    { x: 300, y: 100 },
    { x: 300, y: 300 },
    { x: 100, y: 300 }
];

interface QuadrilateralProps {
    mediaType: 'image' | 'video';
    mediaSrc: string;
    defaultCoordinates?: { x: number; y: number }[] | null;
    onCoordinatesChange?: (points: { x: number; y: number }[]) => void;
    pointsVisible: boolean;
    showLinesAndFill?: boolean;
}

const Quadrilateral: React.FC<QuadrilateralProps> = ({
    mediaType,
    mediaSrc,
    defaultCoordinates = null,
    onCoordinatesChange,
    pointsVisible,
    showLinesAndFill = true
}) => {
    const [points, setPoints] = useState(defaultCoordinates);
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [cursor, setCursor] = useState('default');
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (defaultCoordinates != null) {
            setPoints(defaultCoordinates);
        }
    }, [defaultCoordinates]);

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            if (draggingIndex !== null && pointsVisible && containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const x = event.clientX - containerRect.left;
                const y = event.clientY - containerRect.top;

                const clampedX = Math.max(0, Math.min(x, containerRect.width));
                const clampedY = Math.max(0, Math.min(y, containerRect.height));

                setPoints((prevPoints) => {
                    const newPoints = (prevPoints !== null) ? [...prevPoints] : [];
                    newPoints[draggingIndex] = { x: clampedX, y: clampedY };
                    return newPoints;
                });
            }
        },
        [draggingIndex, pointsVisible]
    );

    const handleMouseUp = useCallback(() => {
        if (draggingIndex !== null && pointsVisible) {
            setDraggingIndex(null);
            setCursor('default');
            if (onCoordinatesChange && points?.length) {
                onCoordinatesChange(points);
            }
        }
    }, [draggingIndex, points, pointsVisible, onCoordinatesChange]);

    const handleMouseDown = (index: number) => {
        if (pointsVisible) {
            setDraggingIndex(index);
            setCursor('grabbing');
        }
    };

    const handleMouseEnter = () => {
        if (draggingIndex === null && pointsVisible) {
            setCursor('pointer');
        }
    };

    const handleMouseLeave = () => {
        if (draggingIndex === null) {
            setCursor('default');
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
        <MediaContainer ref={containerRef} cursor={cursor}>
            {mediaType === 'video' ? (
                <video src={mediaSrc} autoPlay muted loop style={{ width: '100%', height: '100%' }} />
            ) : (
                <MediaElement style={{ backgroundImage: `url(${mediaSrc})` }} />
            )}
            {pointsVisible && points?.length &&
                points.map((point, index) => (
                    <Point
                        key={index}
                        x={point.x}
                        y={point.y}
                        cursor={cursor}
                        selected={draggingIndex === index}
                        onMouseDown={() => handleMouseDown(index)}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                ))
            }
            {
                showLinesAndFill && points?.length && (
                    <>
                        <FilledQuadrilateral points={points} />
                        <Line x1={points[0].x} y1={points[0].y} x2={points[1].x} y2={points[1].y} />
                        <Line x1={points[1].x} y1={points[1].y} x2={points[2].x} y2={points[2].y} />
                        <Line x1={points[2].x} y1={points[2].y} x2={points[3].x} y2={points[3].y} />
                        <Line x1={points[3].x} y1={points[3].y} x2={points[0].x} y2={points[0].y} />
                    </>
                )
            }
        </MediaContainer>
    );
};

export default Quadrilateral;