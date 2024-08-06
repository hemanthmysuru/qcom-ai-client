import { useState, MouseEvent, CSSProperties } from 'react';

const useRippleEffect = () => {
    const [rippleStyle, setRippleStyle] = useState<CSSProperties | null>(null);

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

    return { rippleStyle, createRipple };
};

export default useRippleEffect;
