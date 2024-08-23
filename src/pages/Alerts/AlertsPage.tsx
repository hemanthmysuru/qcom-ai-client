import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import ExpandableAlertList from '../../components/ExpandableAlertList/ExpandableAlertList';
import { Notifications, Settings } from '@mui/icons-material';
import './AlertsPage.scss';
import EventCountBar, { IEventCounter } from '../../components/EventCountBar/EventCountBarComponent';
import CustomDialog from '../../components/CustomDialog/CustomDialogComponent';
import useCustomDialogHandler from '../../components/CustomDialog/useCustomDialogHandler';
import FloorPlan from '../../components/FloorPlan/FloorPlanComponent';
import ZoomablePage from '../../components/zoomable/ZoomablePage';
import CameraView from '../../components/CameraView/CameraViewComponent';
import AlertBox from '../../components/AlertBox/AlertBoxComponent';
import SvgIcon from '../../components/SvgIcons/SvgIconComponent';
import alertService from '../../sdk/services/alertService';
import { scaleToPercentage } from '../../utils/common.util';
import SurveillanceCamera from '../../components/SurveillanceCamera/SurveillanceCameraComponent';
import incidentImage from '../../assets/images/incident-image.png';


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
    { count: 12, icon: 'ppeNoSafetyVest', name: 'PPE - No safty vest' },
    { count: 3, icon: 'ppeNoMask', name: 'PPE - No mask' },
    { count: 9, icon: 'fallDetection', name: 'Fall detection' },
    { count: 19, icon: 'proximityToRunningEquipment', name: 'Proximity to run equipment' },
];

const AlertsPage: React.FC = () => {
    const { openDialog, handleOpenDialog, handleCloseDialog, handleCancelDialog, handleSaveDialog } = useCustomDialogHandler();

    const [selectedCamView, setSelectedCamView] = useState<string>();

    useEffect(() => {
        const handleGetFloorMapCameraDetails = async () => {
            const response = await alertService.getAllFloorMapCameraDetails();
            const alertresponse = await alertService.getAllAlerts();
            console.log(response, alertresponse);
        }

        handleGetFloorMapCameraDetails();
    }, []);

    const handleAlertViewDetailsClick = () => {
        handleOpenDialog();
    }

    const listContent = (
        <>
            <ExpandableAlertList items={Expandableitems} onAlertViewDetailsClick={handleAlertViewDetailsClick} />
        </>
    );

    const cameraZoneRenderer = (
        <ZoomablePage
            components={[
                {
                    component: (
                        <SurveillanceCamera />
                    ), position: { x: scaleToPercentage(0.3), y: scaleToPercentage(0.9) }
                }
            ]}
            showZoomControls={false}
            isImageDraggable={false}
            isCamCreationAllowed={false} />
    )

    const dialogContent = (
        <section className="dialog-content">
            <aside className='side-content'>
                {
                    <ExpandableAlertList
                        items={Expandableitems}
                        showHeader={false}
                        onAlertViewDetailsClick={handleAlertViewDetailsClick} />
                }
            </aside>
            <div className="main-content">
                {/* <p>Main content goes here...................!</p> */}
                <ul className='grid-container'>
                    <li className='grid-item live-feed'>
                        <figure>
                            <img src={incidentImage} />
                        </figure>
                    </li>
                    <li className='grid-item recording'>
                        <figure>
                            <img src={incidentImage} />
                        </figure>
                    </li>
                    <li className='grid-item nested-grid'>
                        <ol className='grid-container inner-grid'>
                            <li className='grid-item incident-images'>
                                <figure>
                                    <img src={incidentImage} />
                                </figure>
                            </li>
                            <li className='grid-item incident-images'>
                                <figure>
                                    <img src={incidentImage} />
                                </figure>
                            </li>
                            <li className='grid-item incident-images'>
                                <figure>
                                    <img src={incidentImage} />
                                </figure>
                            </li>
                            <li className='grid-item incident-images'>
                                <figure>
                                    <img src={incidentImage} />
                                </figure>
                            </li>
                        </ol>
                    </li>
                    <li className='grid-item'>{cameraZoneRenderer}</li>
                </ul>
            </div>
        </section>
    );

    const alertBoxRenderer = () => {
        return (
            <AlertBox
                headerLabel="Unattended"
                subHeaderLabel="Production zone"
                subHeaderIcon={<SvgIcon name='location' />}
                footerLabel="Cam ID - #2"
                timestamp="07-22-2024 | 12:09 AM"
                showActionSection={true}
                showViewDetailsBtn={true}
                thumbnails={{
                    image: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
                    video: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg'
                }}
                onAlertViewDetailsClick={function (): void {
                    // throw new Error("Function not implemented.");
                    console.log('Alert box:: ',);
                }} />
        );
    }

    const alertBoxAndCameraViewRenderer = (id: string) => {
        return (
            <section className="alert-box-and-cam-view">
                {selectedCamView == id && alertBoxRenderer()}
                <CameraView
                    cameraAngle={100}
                    fieldOfView={100}
                    showPin={true}
                    pinTxt='20'
                    onPinClick={() => {
                        console.log(this);
                        setSelectedCamView(id);
                    }}
                />
            </section>
        );
    }

    const dynamicComponents = [
        {
            component: alertBoxAndCameraViewRenderer('1'),
            position: { x: '10%', y: '20%' },
            id: '1',
        },
        {
            component: alertBoxAndCameraViewRenderer('2'),
            position: { x: '30%', y: '50%' },
            id: '2'
        },
    ];

    const handleComponentPositionChange = (position: { x: string; y: string }) => {
        console.log(`Updated/Created component position: x=${position.x}, y=${position.y}`);
    }

    const draggableCam = (<CameraView
        cameraAngle={100}
        fieldOfView={100}
        showPin={false}
        onPinClick={() => {
            console.log(this);
            // setSelectedCamView(id);
        }}
    />);

    const mainContent = (
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <EventCountBar countList={eventCounterList} />

            <CustomDialog
                headerLabel='Cam ID - Camera #1 - PPE - No Hard Hat'
                open={openDialog}
                content={dialogContent}
                dialogMaxWidth='lg'
                cancelText="Cancel"
                saveText="Save"
                onClose={handleCloseDialog}
                onCancel={handleCancelDialog}
                onSave={handleSaveDialog}
            />

            <br />

            {/* <FloorPlan showZoomAction={true} showFullScreenAction={true} /> */}

            <ZoomablePage
                components={dynamicComponents}
                showZoomControls={true}
                isImageDraggable={true}
                isCamCreationAllowed={false}
            // draggableComponent={draggableCam}
            // createAndDraggableComp={draggableCam}
            // onComponentPositionChange={handleComponentPositionChange} 
            />
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
