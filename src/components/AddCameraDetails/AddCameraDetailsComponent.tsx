import React, { useState, useEffect, useCallback } from 'react';
import './AddCameraDetailsComponent.scss';
// import floorPlan from '../../assets/images/floor-plan.png';
import floorPlan from '../../assets/svgs/floor-plan.svg';
import ImageWithDraggableIcon from '../ImageWithDraggableIcon/ImageWithDraggableIconComponent';
import { debounce } from '../../utils/debounce';
import ZoomableCanvas from '../zoomableCanvas/ZoomableCanvasComponent';
import CameraView from '../CameraView/CameraViewComponent';
import ZoomablePage from '../zoomable/ZoomablePage';

export type FormFieldsType = {
    cameraId: string;
    cameraName: string;
    rtspUrl: string;
    location: string;
    xCoordinate: string;
    yCoordinate: string;
    cameraAngle: number;
    fieldOfView: number;
};

interface IAddCameraDetails {
    onFormChange: (data: FormFieldsType) => void;
}

const AddCameraDetails: React.FC<IAddCameraDetails> = ({ onFormChange }) => {
    const [formData, setFormData] = useState<FormFieldsType>({
        cameraId: '',
        cameraName: '',
        rtspUrl: '',
        location: '',
        xCoordinate: '',
        yCoordinate: '',
        cameraAngle: 0,
        fieldOfView: 0,
    });

    // Debounced function for handling form change
    const debouncedOnFormChange = useCallback(
        debounce((data: FormFieldsType) => {
            try {
                onFormChange(data);
            } catch (error) {
                console.error('Error updating form:', error);
            }
        }, 500),
        [onFormChange]
    );

    // Handle changes in form fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => {
            const updatedValue = name === 'cameraAngle' || name === 'fieldOfView'
                ? Math.max(0, Math.min(parseInt(value, 10), 360))
                : value;
            const updatedFormData = { ...prevState, [name]: updatedValue };

            debouncedOnFormChange(updatedFormData);
            return updatedFormData;
        });
    };

    // Handle changes in icon position
    const handleIconPositionChange = (x: number, y: number) => {
        setFormData(prevState => {
            const updatedFormData = {
                ...prevState,
                xCoordinate: x.toFixed(2),
                yCoordinate: y.toFixed(2),
            };
            debouncedOnFormChange(updatedFormData);
            return updatedFormData;
        });
    };

    // Render a single input block
    const inputBlockRenderer = (
        labelTxt: string,
        inputType: 'text' | 'number',
        isMandatory: boolean,
        placeHolderTxt: string,
        isDisabled: boolean,
        name: keyof FormFieldsType,
        min?: number,
        max?: number
    ) => (
        <div className="input-block">
            <label htmlFor={name}>
                {labelTxt}{isMandatory && <mark>*</mark>}
            </label>
            <input
                type={inputType}
                placeholder={placeHolderTxt}
                disabled={isDisabled}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                min={min}
                max={max}
            />
        </div>
    );

    // Effect to clean up any remaining debounced calls when the component unmounts
    useEffect(() => {
        return () => {
            debouncedOnFormChange.cancel();
        };
    }, [debouncedOnFormChange]);

    const initialCameraViews = [
        { x: 100, y: 150, cameraAngle: 30, cameraFieldOfView: 60, pinTxt: '1' },
        { x: 300, y: 200, cameraAngle: 45, cameraFieldOfView: 75, pinTxt: '2' },
    ];

    const handleComponentPositionChange = (position: { x: string; y: string }) => {
        console.log(`Updated/Created component position: x=${position.x}, y=${position.y}`);
        setFormData(prevState => {
            const updatedFormData = {
                ...prevState,
                xCoordinate: position.x,
                yCoordinate: position.y,
            };
            debouncedOnFormChange(updatedFormData);
            return updatedFormData;
        });
    }

    // const cameraViewRenderer = (formData: FormFieldsType) => {
    //     console.log('formData:: ', formData);
    //     return (
    //         <CameraView
    //             cameraAngle={formData.cameraAngle}
    //             fieldOfView={formData.fieldOfView}
    //             showPin={false}
    //             onPinClick={() => {
    //                 console.log(this);
    //                 // setSelectedCamView(id);
    //             }}
    //         />
    //     )
    // }

    const draggableComponent = {
        component: (
            <CameraView
                cameraAngle={formData?.cameraAngle || 0}
                fieldOfView={formData?.fieldOfView || 0}
                showPin={false}
            />
        ),
        cameraAngle: formData.cameraAngle,
        fieldOfView: formData.fieldOfView
        // ), position: { x: (selectedCamera?.x_coordinate || 0)?.toString(), y: (selectedCamera?.y_coordinate || 0)?.toString() }
    }


    return (
        <section className="add-camera-details">
            <aside className="left-content">
                <header>Camera details</header>

                <section className="form-block">
                    <div className="form-content">
                        {inputBlockRenderer('Camera ID', 'text', true, 'Enter camera ID', false, 'cameraId')}
                        {inputBlockRenderer('Camera Name', 'text', true, 'Enter camera name', false, 'cameraName')}
                        {inputBlockRenderer('RTSP URL', 'text', true, 'Enter RTSP URL', false, 'rtspUrl')}
                        {inputBlockRenderer('Camera Location', 'text', true, 'Enter camera location', false, 'location')}
                        <div className="row">
                            <section className="column">
                                {inputBlockRenderer('x-coordinate', 'text', true, 'x-coordinate', true, 'xCoordinate')}
                            </section>
                            <section className="column">
                                {inputBlockRenderer('y-coordinate', 'text', true, 'y-coordinate', true, 'yCoordinate')}
                            </section>
                        </div>
                        <p>*Click on the map for entering camera location</p>
                        <div className="row">
                            <section className="column">
                                {inputBlockRenderer('Camera Angle', 'number', true, 'Enter angle', false, 'cameraAngle', 0, 360)}
                            </section>
                            <section className="column">
                                {inputBlockRenderer('Camera FoV', 'number', true, 'Enter FoV', false, 'fieldOfView', 0, 360)}
                            </section>
                        </div>
                    </div>
                </section>
            </aside>

            <article className="main-content">
                {/* <ImageWithDraggableIcon
                    imgSrc={floorPlan}
                    cameraAngle={formData.cameraAngle}
                    cameraFieldOfView={formData.fieldOfView}
                    // onPositionChange={handleIconPositionChange}
                    onPositionChange={() => { }}
                    isDragging={true}
                /> */}
                {/* <ZoomableCanvas
                    imgSrc={floorPlan}
                    cameraAngle={formData.cameraAngle}
                    cameraFieldOfView={formData.fieldOfView}
                    onPositionChange={handleIconPositionChange}
                    camCreatable={true}
                // cameraViewsData={initialCameraViews}
                /> */}

                {/* <p>{formData?.cameraAngle}</p> */}

                <ZoomablePage
                    components={[]}
                    showZoomControls={false}
                    isImageDraggable={false}
                    isCamCreationAllowed={true}
                    draggableComponent={draggableComponent}
                    onComponentPositionChange={handleComponentPositionChange} />
            </article>
        </section>
    );
};

export default AddCameraDetails;
