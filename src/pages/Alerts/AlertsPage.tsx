import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import ExpandableAlertList from '../../components/ExpandableAlertList/ExpandableAlertList';
import { Notifications, Settings } from '@mui/icons-material';
import './AlertsPage.scss';
import EventCountBar, { IEventCounter } from '../../components/EventCountBar/EventCountBarComponent';
import CustomDialog from '../../components/CustomDialog/CustomDialogComponent';
import useCustomDialogHandler from '../../components/CustomDialog/useCustomDialogHandler';
import FloorPlan from '../../components/FloorPlan/FloorPlanComponent';


const Expandableitems = [
    { id: 1, title: 'Item 1', content: <Notifications /> },
    { id: 2, title: 'Item 2', content: (<div><h4>Content for Item 2</h4><p>This content includes some static text and styles.</p></div>) },
    { id: 3, title: 'Item 3', content: (<div><button onClick={() => alert('Button Clicked!')}>Click Me</button></div>) },
    { id: 4, title: 'Item 4', content: (<div><button onClick={() => alert('Button Clicked!')}>Click Me</button></div>) },
    { id: 5, title: 'Item 5', content: (<div><h4>Content for Item 5</h4><p>This content includes some static text and styles.</p></div>) },
    { id: 6, title: 'Item 6', content: (<div><h4>Content for Item 6</h4><p>This content includes some static text and styles.</p></div>) },
    { id: 7, title: 'Item 7', content: (<div><button onClick={() => alert('Button Clicked!')}>Click Me</button></div>) },
    { id: 8, title: 'Item 8', content: <Notifications /> },
    { id: 9, title: 'Item 9', content: <Settings /> },
];

const eventCounterList: IEventCounter[] = [
    { count: 54, icon: 'safetyInfractions', name: 'Safety Infraction' },
    { count: 10, icon: 'ppeNoHardHat', name: 'PPE - No hard hat' },
    { count: 54, icon: 'ppeNoSafetyVest', name: 'PPE - No safty vest' },
    { count: 54, icon: 'ppeNoMask', name: 'PPE - No mask' },
    { count: 9, icon: 'fallDetection', name: 'Fall detection' },
    { count: 188, icon: 'proximityToRunningEquipment', name: 'Proximity to run equipment' },
];

const AlertsPage: React.FC = () => {
    const { openDialog, handleOpenDialog, handleCloseDialog, handleCancelDialog, handleSaveDialog } = useCustomDialogHandler();

    const handleAlertViewDetailsClick = () => {
        handleOpenDialog();
    }

    const listContent = (
        <>
            <ExpandableAlertList items={Expandableitems} onAlertViewDetailsClick={handleAlertViewDetailsClick} />
        </>
    );

    const dialogContent = (
        <section className="dialog-content">
            <aside className='side-content'>{listContent}</aside>
            <div className="main-content">
                <p>Main content goes here...................!</p>
            </div>
        </section>
    );


    const mainContent = (
        <div>
            <EventCountBar countList={eventCounterList} />

            <CustomDialog
                open={openDialog}
                content={dialogContent}
                dialogMaxWidth='md'
                cancelText="Cancel"
                saveText="Save"
                onClose={handleCloseDialog}
                onCancel={handleCancelDialog}
                onSave={handleSaveDialog}
            />

            <br />

            <FloorPlan showZoomAction={true} showFullScreenAction={true} />
        </div>
    );


    return (
        <section className='alerts-page'>
            <MainLayout listPosition="right" listContent={listContent} mainContent={mainContent} />

            {/* <ResponsiveDrawer listPosition='right' mainContent={mainContent} listContent={listContent} /> */}
        </section>
    );
};

export default AlertsPage;
