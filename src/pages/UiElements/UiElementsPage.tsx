import { useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButtonComponent";
import CustomDialog from "../../components/CustomDialog/CustomDialogComponent";
import AlertBox from "../../components/AlertBox/AlertBoxComponent";
import { Notifications } from "@mui/icons-material";
import EventCountBar, { IEventCounter } from "../../components/EventCountBar/EventCountBarComponent";
import ExpandableList from "../../components/ExpandableList/ExpandableList";
import ExpandableAlertList from "../../components/ExpandableAlertList/ExpandableAlertList";
import { Divider } from "@mui/material";
import './UiElementsPage.scss';
import RippleEffect from "../../components/RippleEffect/RippleEffect";
import Quadrilateral from "../../components/Quadrilateral/QuadrilateralComponent";
import floorHotspotImage from '../../assets/images/floor-hotspot1.png';
import floorHotspotVideo from '../../assets/videos/floor-hotspot1.mp4';
import useCustomDialogHandler from "../../components/CustomDialog/useCustomDialogHandler";

const eventCounterList: IEventCounter[] = [
    { count: 54, icon: 'safetyInfractions', name: 'Safety Infraction' },
    { count: 10, icon: 'ppeNoHardHat', name: 'PPE - No hard hat' },
    { count: 54, icon: 'ppeNoSafetyVest', name: 'PPE - No safty vest' },
    { count: 54, icon: 'ppeNoMask', name: 'PPE - No mask' },
    { count: 9, icon: 'fallDetection', name: 'Fall detection' },
    { count: 188, icon: 'proximityToRunningEquipment', name: 'Proximity to run equipment' },
];

const expandableitems = [
    { id: 1, title: 'Item 1', content: <Notifications /> },
    { id: 2, title: 'Item 2', content: (<div><h4>Content for Item 2</h4><p>This content includes some static text and styles.</p></div>) },
    { id: 3, title: 'Item 3', content: (<div><button onClick={() => alert('Button Clicked!')}>Click Me</button></div>) },
    { id: 4, title: 'Item 4', content: (<div><button onClick={() => alert('Button Clicked!')}>Click Me</button></div>) },
];


const UiElementsPage: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const [coordinates, setCoordinates] = useState<any>([
        {
            "x": 8,
            "y": 101.40277862548828
        },
        {
            "x": 481,
            "y": 293.4027786254883
        },
        {
            "x": 525,
            "y": 498.4027786254883
        },
        {
            "x": 340,
            "y": 476.4027786254883
        }
    ]);
    const { openDialog, handleOpenDialog, handleCloseDialog, handleCancelDialog, handleSaveDialog } = useCustomDialogHandler();

    const handleOpen = () => {
        handleOpenDialog();
    }

    const handleCoordinatesChange = (points: { x: number; y: number }[]) => {
        console.log('Updated Coordinates:', points);
        // You can perform further actions with the updated coordinates here
    };

    return (
        <section className="ui-elements-page">

            <header>Quadrilateral video</header>
            <section className="content">
                <Quadrilateral
                    mediaType="video"
                    pointsVisible={false}
                    mediaSrc={floorHotspotVideo}
                    defaultCoordinates={coordinates}
                    onCoordinatesChange={handleCoordinatesChange} />
            </section>

            <Divider />

            <header>Quadrilateral image</header>
            <section className="content">
                <Quadrilateral
                    mediaType="image"
                    pointsVisible={true}
                    mediaSrc={floorHotspotImage}
                    onCoordinatesChange={handleCoordinatesChange} />
            </section>

            <Divider />

            <header>Buttons</header>
            <section className="content">
                <CustomButton
                    icon="settings" // Material-UI icon name
                // contentDisplay='only-icon-or-text'
                // type="iconOnly"
                // onClick={() => console.log('Icon Only Button Clicked')}
                />

                <CustomButton
                    icon="delete"
                    variant="outlined"
                />

                {/* Contained button with only text */}
                <CustomButton
                    text="Contained"
                />

                {/* Outlined button with only text */}
                <CustomButton
                    text="Outlined"
                    variant="outlined"
                />

                {/* Contained button with both text and icon */}
                <CustomButton
                    text="Star"
                    icon="star"
                    iconPosition="start"
                />

                {/* Outlined button with both text and icon */}
                <CustomButton
                    text="Star"
                    icon="chair"
                    variant="outlined"
                    iconPosition="start"
                />

                <CustomButton
                    text="Warning Button"
                    icon="warning"
                    variant="contained"  // You can use 'outlined' as well
                    btnType="warning"
                />

                <CustomButton
                    text="Success Button"
                    icon="check_circle"
                    variant="contained"  // You can use 'outlined' as well
                    btnType="success"
                />

                <CustomButton
                    text="Error Button"
                    icon="error"
                    variant="contained"  // You can use 'outlined' as well
                    btnType="error"
                />
            </section>

            <Divider />

            <header>Dialog box</header>
            <section className="content">
                <CustomButton
                    text="Open dialog"
                    icon="chair"
                    variant="contained"
                    iconPosition="start"
                    onClick={handleOpen}
                />

                <CustomDialog
                    headerLabel='Header label'
                    open={openDialog}
                    content={<div>Dynamic Content Goes Here</div>}
                    dialogMaxWidth='md'
                    cancelText="Cancel"
                    saveText="Save"
                    onClose={handleCloseDialog}
                    onCancel={handleCancelDialog}
                    onSave={handleSaveDialog}
                />
            </section>

            <Divider />

            <header>Alert box</header>
            <section className="content">
                <div style={{ width: '284px' }}>

                    <AlertBox
                        headerLabel="Unattended"
                        subHeaderLabel="Production zone"
                        subHeaderIcon={<Notifications />}
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
                </div>
            </section>

            <Divider />

            <header>Event count bar</header>
            <section className="content">
                <EventCountBar countList={eventCounterList} />
            </section>

            {/* <header>Expandable list</header>
            <section className="content">
                <div style={{ width: '320px' }}>
                    <ExpandableList items={expandableitems} />
                </div>
            </section> */}

            <Divider />

            <header>Expandable alert list</header>
            <section className="content">
                <div style={{ width: '320px' }}>
                    <ExpandableAlertList items={expandableitems} onAlertViewDetailsClick={function (): void {
                        // throw new Error("Function not implemented.");
                        console.log('ExpandableAlertList:: ', expandableitems);
                    }} />
                </div>
            </section>

            <Divider />

            <header>Ripple</header>
            <section className="content">
                <RippleEffect as="button" className="ripple-button">Button</RippleEffect>
                <RippleEffect as="a" href="#" className="ripple-link">Link</RippleEffect>
                <RippleEffect as="span" className="ripple-span">Span</RippleEffect>
                <RippleEffect as="figure" className="ripple-figure">
                    <img src="image.jpg" alt="Example" />
                    <figcaption>Figure</figcaption>
                </RippleEffect>
            </section>


        </section>
    );
}

export default UiElementsPage;