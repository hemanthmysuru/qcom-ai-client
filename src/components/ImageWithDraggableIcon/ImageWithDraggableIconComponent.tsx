import React, { useState, useCallback } from 'react';
import Draggable from 'react-draggable';
import './ImageWithDraggableIconComponent.scss'; // Add your styles here

interface IImageWithDraggableIcon {
    imgSrc: any;
}

const ImageWithDraggableIcon: React.FC<IImageWithDraggableIcon> = ({ imgSrc }) => {
    const [icons, setIcons] = useState<{ id: number; x: number; y: number }[]>([]);
    const [nextId, setNextId] = useState(1);

    const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
        const { clientX, clientY } = event;
        const imageRect = (event.target as HTMLImageElement).getBoundingClientRect();
        const x = clientX - imageRect.left;
        const y = clientY - imageRect.top;

        setIcons(prevIcons => [
            ...prevIcons,
            { id: nextId, x, y }
        ]);
        setNextId(prevId => prevId + 1);
    };

    const handleStop = (e: any, data: { x: number; y: number }) => {
        console.log('Coordinates:', data.x, data.y);
    };

    return (
        <div className="image-with-draggable-icon">
            <img
                // src="https://via.placeholder.com/800x600" // Replace with your image URL
                src={imgSrc} // Replace with your image URL
                alt="Clickable Area"
                onClick={handleClick}
                className="background-image"
            />
            {icons.map(icon => (
                <Draggable
                    key={icon.id}
                    defaultPosition={{ x: icon.x, y: icon.y }}
                    onStop={handleStop}
                >
                    <div className="draggable-icon">
                        <span>Hello world</span>
                        <img src="https://via.placeholder.com/50" alt="Icon" /> {/* Replace with your icon URL */}
                    </div>
                </Draggable>
            ))}
        </div>
    );
};

export default ImageWithDraggableIcon;
