import React, { useState, useEffect } from 'react';
import './CustomCheckboxComponent.scss';

interface CustomCheckboxProps {
    checked?: boolean; // Make this optional for default value
    onChange?: (checked: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked = false, onChange }) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    const handleChange = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        if (onChange) {
            onChange(newChecked);
        }
    };

    return (
        <label className="checkbox-container">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
                readOnly
            />
            <span className="custom-checkbox"></span>
        </label>
    );
};

export default CustomCheckbox;
