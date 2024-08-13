import React from 'react';
import SvgIcon from '../SvgIcons/SvgIconComponent';
import './PinComponent.scss';

interface IPinProps {
    text: string;
    iconSize?: number;
    onClick?: () => void; // New prop
}

const Pin: React.FC<IPinProps> = ({ text, iconSize = 56, onClick }) => {
    return (
        <div className="pin" onClick={onClick}>
            <SvgIcon name='pin' width={iconSize} height={iconSize} />
            <figcaption>{text}</figcaption>
        </div>
    );
}

export default Pin;
