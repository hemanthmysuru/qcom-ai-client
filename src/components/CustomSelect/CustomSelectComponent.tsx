import React, { useState, useRef, useEffect } from 'react';
import './CustomSelectComponent.scss';
import SvgIcon from '../SvgIcons/SvgIconComponent';

interface CustomSelectProps {
    options: string[];
    selectedOption: string;
    onChange: (option: string) => void;
    placeholder?: string; // Added placeholder prop
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, selectedOption, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const handleSelect = (option: string) => {
        onChange(option);
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="custom-select" ref={selectRef}>
            <div className="custom-select__header" onClick={() => setIsOpen(!isOpen)}>
                <span>{selectedOption || placeholder || 'Select an option'}</span>
                <div className={`custom-select__arrow ${isOpen ? 'open' : ''}`}>
                    <SvgIcon name='arrowDownBlue' width={16} height={16} />
                </div>
            </div>
            {isOpen && (
                <div className="custom-select__options">
                    {options.map(option => (
                        <div
                            key={option}
                            className={`custom-select__option ${option === selectedOption ? 'selected' : ''}`}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
