import React, { useState, useEffect } from 'react';
import './CustomCheckboxComponent.scss';

interface CustomCheckboxProps {
    checked?: boolean; // Make this optional for default value
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked = false, onChange, disabled = false }) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    const handleChange = () => {
        if (!disabled) {
            const newChecked = !isChecked;
            setIsChecked(newChecked);
            if (onChange) {
                onChange(newChecked);
            }
        }
    };

    return (
        <label className={`checkbox-container ${disabled ? 'disabled' : ''}`}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
                disabled={disabled}
                readOnly
            />
            <span className="custom-checkbox"></span>
        </label>
    );
};

export default CustomCheckbox;
