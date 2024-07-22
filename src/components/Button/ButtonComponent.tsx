// AppButton.tsx
import React, { useCallback, useState, MouseEventHandler, ReactNode, useEffect } from 'react';
import './ButtonComponent.scss';

interface AppButtonProps {
    icon?: ReactNode;
    text?: string;
    variant?: 'default' | 'transparent';
    color?: 'blue';
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
    icon,
    text,
    variant = 'default',
    color = 'blue',
    onClick,
    disabled = false
}) => {
    const [ripple, setRipple] = useState<{ top: number; left: number; size: number } | null>(null);

    const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>((e) => {
        if (disabled) return;

        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        setRipple({
            top: y,
            left: x,
            size: size
        });

        if (onClick) {
            onClick(e);
        }
    }, [onClick, disabled]);

    useEffect(() => {
        if (!ripple) return;

        const timer = setTimeout(() => {
            setRipple(null);
        }, 600); // Duration of ripple animation

        return () => clearTimeout(timer);
    }, [ripple]);

    const hasIconOnly = icon && !text;
    const hasIconAndText = icon && text;

    return (
        <button
            className={`app-button ${variant} ${color} ${hasIconOnly ? 'icon-only' : ''}`}
            onClick={handleClick}
            disabled={disabled}
        >
            {icon && <span className={`icon ${hasIconAndText ? 'has-text' : ''}`}>{icon}</span>}
            {text && <span className="text">{text}</span>}
            {ripple && (
                <span
                    className="ripple"
                    style={{
                        top: ripple.top,
                        left: ripple.left,
                        width: ripple.size,
                        height: ripple.size
                    }}
                />
            )}
        </button>
    );
};

export default AppButton;
