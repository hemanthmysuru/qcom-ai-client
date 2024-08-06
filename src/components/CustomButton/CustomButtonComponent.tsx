import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import { SxProps, Theme } from '@mui/system';
import styles from './CustomButton.module.scss';

interface CustomButtonProps {
    text?: string;
    icon?: React.ReactNode | string; // Name of the Material-UI icon
    iconPosition?: 'start' | 'end'; // Position of the icon
    variant?: 'contained' | 'outlined' | 'text'; // Button variant
    type?: 'button' | 'submit';
    btnType?: 'primary' | 'warning' | 'success' | 'error'; // Button type
    className?: string;
    sx?: SxProps<Theme>; // Style overrides
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
    sx,
    onClick,
}) => {
    // Determine if the button is only an icon button
    const isIconOnly = !text && !!icon;
    const buttonSize: string = '36px';

    // Combine classes based on type and variant
    // const buttonClass = `${styles.button} ${styles[variant]} ${styles[type]} ${isIconOnly ? styles.iconOnly : ''}`;
    const buttonClass = `${styles.button} ${styles[variant]} ${styles[btnType]} ${className}`;

    // Handle click and stop event propagation
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (onClick) {
            onClick();
        }
    };

    // Render the icon based on whether it's a string or a React node
    const renderIcon = () => {
        if (typeof icon === 'string') {
            return <Icon>{icon}</Icon>;
        }
        return icon;
    };

    if (isIconOnly) {
        return (
            <IconButton
                onClick={handleClick}
                sx={{
                    borderRadius: '50%', // Fully rounded for icon-only buttons
                    width: buttonSize,
                    height: buttonSize,
                    padding: 0,
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Shadow for icon-only buttons
                    backgroundColor: 'transparent', // No background
                    border: 'none', // No border
                    ...sx,
                }}
                className={buttonClass}
            >
                {renderIcon()}
            </IconButton>
        );
    }

    return (
        <Button
            variant={variant}
            startIcon={icon && iconPosition === 'start' ? renderIcon() : undefined}
            endIcon={icon && iconPosition === 'end' ? renderIcon() : undefined}
            onClick={handleClick}
            className={buttonClass}
            sx={{
                fontSize: '1.4rem',
                fontWeight: '400',
                height: buttonSize,
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Shadow for all buttons
                ...sx,
            }}
            type={type == 'submit' ? 'submit' : 'button'}
        >
            {text}
        </Button>
    );
};

export default CustomButton;
