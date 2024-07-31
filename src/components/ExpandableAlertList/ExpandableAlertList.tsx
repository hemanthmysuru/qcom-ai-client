import React, { useState } from "react";
import { Notifications } from "@mui/icons-material";
import AlertBox from "../AlertBox/AlertBoxComponent";
import './ExpandableAlertList.scss';

// Define a type for the list item props
interface ListItem {
    id: number;
    title: string;
    content: React.ReactNode;
}

// Define the component props
interface ExpandableListProps {
    items: ListItem[];
    onAlertViewDetailsClick: () => void;
}

const ExpandableAlertList: React.FC<ExpandableListProps> = ({ items, onAlertViewDetailsClick }) => {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const handleClick = (id: number) => {
        setExpandedId(expandedId === id ? null : id); // Toggle expansion
    };

    return (
        <section className="expandable-alert-list">
            <ul>
                {items.map((item: ListItem) => (
                    <li key={item.id} onClick={() => handleClick(item.id)} className={(expandedId === item.id) ? 'selected' : ''}>
                        <AlertBox
                            headerLabel="Unattended"
                            subHeaderLabel="Production zone"
                            subHeaderIcon={<Notifications />}
                            footerLabel="Cam ID - #2"
                            timestamp="07-22-2024 | 12:09 AM"
                            showActionSection={expandedId === item.id} // Show action section if this is the expanded item
                            showViewDetailsBtn={true}
                            thumbnails={{
                                image:
                                    "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
                                video:
                                    "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
                            }}
                            onAlertViewDetailsClick={onAlertViewDetailsClick}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ExpandableAlertList;
