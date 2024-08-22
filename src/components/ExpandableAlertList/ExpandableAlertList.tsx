import { Notifications } from "@mui/icons-material";
import React, { useState } from "react";
import AlertBox from "../AlertBox/AlertBoxComponent";
import CustomButton from "../CustomButton/CustomButtonComponent";
import SvgIcon from "../SvgIcons/SvgIconComponent";
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
    showHeader?: boolean;
    onAlertViewDetailsClick: () => void;
}

const ExpandableAlertList: React.FC<ExpandableListProps> = ({ items, onAlertViewDetailsClick, showHeader = true }) => {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const handleClick = (id: number) => {
        setExpandedId(expandedId === id ? null : id); // Toggle expansion
    };

    return (
        <section className="expandable-alert-list">

            {
                showHeader && (
                    <header className="list-header">
                        <div>
                            <h4>Alerts</h4>
                        </div>

                        <aside className="actions">
                            <CustomButton icon={<SvgIcon name='sort' width={16} height={16} />} variant='contained' />
                            <CustomButton icon={<SvgIcon name='search' width={16} height={16} />} variant='contained' />
                        </aside>
                    </header>
                )
            }

            <aside className="list-content">
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
            </aside>
        </section>
    );
};

export default ExpandableAlertList;
