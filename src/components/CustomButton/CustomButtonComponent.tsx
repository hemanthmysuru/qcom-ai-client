import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import { SxProps, Theme } from '@mui/system';
import styles from './CustomButton.module.scss';

interface CustomButtonProps {
    text?: string;
    icon?: string; // Name of the Material-UI icon
    iconPosition?: 'start' | 'end'; // Position of the icon
    variant?: 'contained' | 'outlined' | 'text'; // Button variant
    type?: 'primary' | 'warning' | 'success' | 'error'; // Button type
    className?: string;
    sx?: SxProps<Theme>; // Style overrides
    onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    text,
    icon,
    iconPosition = 'start',
    variant = 'contained',
    type = 'primary',
    className = '',
    sx,
    onClick,
}) => {
    // Determine if the button is only an icon button
    const isIconOnly = !text && !!icon;
    const buttonSize: string = '40px';

    // Combine classes based on type and variant
    // const buttonClass = `${styles.button} ${styles[variant]} ${styles[type]} ${isIconOnly ? styles.iconOnly : ''}`;
    const buttonClass = `${styles.button} ${styles[variant]} ${styles[type]} ${className}`;

    if (isIconOnly) {
        return (
            <IconButton
                onClick={onClick}
                sx={{
                    borderRadius: '50%', // Fully rounded for icon-only buttons
                    minWidth: buttonSize,
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
                <Icon>{icon}</Icon>
            </IconButton>
        );
    }

    return (
        <Button
            variant={variant}
            startIcon={icon && iconPosition === 'start' ? <Icon>{icon}</Icon> : undefined}
            endIcon={icon && iconPosition === 'end' ? <Icon>{icon}</Icon> : undefined}
            onClick={onClick}
            className={buttonClass}
            sx={{
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Shadow for all buttons
                ...sx,
            }}
        >
            {text}
        </Button>
    );
};

export default CustomButton;
