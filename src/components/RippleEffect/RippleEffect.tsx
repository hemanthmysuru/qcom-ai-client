import React, { useState, MouseEvent, ElementType } from 'react';
import './RippleEffect.scss';

interface RippleEffectProps {
    as?: ElementType;
    className?: string;
    children?: React.ReactNode;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    [key: string]: any; // Allow other props to be passed through
}

const RippleEffect = React.forwardRef<HTMLElement, RippleEffectProps>(
    ({ as: Tag = 'div', children, className = '', onClick, ...props }, ref) => {
        const [rippleStyle, setRippleStyle] = useState<React.CSSProperties | null>(null);

        const createRipple = (event: MouseEvent<HTMLElement>) => {
            const element = event.currentTarget;
            const rect = element.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;

            setRippleStyle({
                width: size,
                height: size,
                top: y,
                left: x,
            });

            // Remove the ripple after animation
            setTimeout(() => {
                setRippleStyle(null);
            }, 500);
        };

        const handleClick = (event: MouseEvent<HTMLElement>) => {
            createRipple(event);
            if (onClick) {
                onClick(event);
            }
        };

        return (
            <Tag
                ref={ref as any}
                className={`ripple-container ${className}`}
                onClick={handleClick}
                {...props}
            >
                {rippleStyle && <span className="ripple" style={rippleStyle} />}
                {children}
            </Tag>
        );
    }
);

export default RippleEffect;
