import React from 'react';
import styles from './CustomButton.module.scss';

interface CustomButtonProps {
    text?: string;
    icon?: React.ReactNode;
    iconPosition?: 'start' | 'end';
    variant?: 'contained' | 'outlined' | 'text';
    type?: 'button' | 'submit';
    btnType?: 'primary' | 'warning' | 'success' | 'error';
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    text,
    icon,
    iconPosition = 'start',
    variant = 'contained',
    type = 'button',
    btnType = 'primary',
    className = '',
    disabled = false,
    onClick,
}) => {
    // Determine if the button is icon-only
    const isIconOnly = !text && !!icon;

    // Combine classes based on type and variant
    const buttonClass = `${styles.button} ${styles[variant]} ${styles[btnType]} ${className}`;

    // Handle click and stop event propagation
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (onClick && !disabled) {
            onClick();
        }
    };

    return (
        <button
            type={type}
            onClick={handleClick}
            disabled={disabled}
            className={isIconOnly ? `${styles.iconOnly} ${buttonClass}` : buttonClass}
        >
            {icon && iconPosition === 'start' && icon}
            {text && <span>{text}</span>}
            {icon && iconPosition === 'end' && icon}
        </button>
    );
};

export default CustomButton;
