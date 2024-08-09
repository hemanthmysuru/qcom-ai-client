import React, { useState } from 'react';
import './AddCameraDetailsComponent.scss';
import floorPlan from '../../assets/images/floor-plan.png';
import ImageWithDraggableIcon from '../ImageWithDraggableIcon/ImageWithDraggableIconComponent';

type FormFields = {
    cameraId: string;
    cameraName: string;
    rtspUrl: string;
    cameraLocation: string;
    xCoordinate: string;
    yCoordinate: string;
    cameraAngle: string;
    cameraFov: string;
};

const AddCameraDetails: React.FC = () => {
    const [formData, setFormData] = useState<FormFields>({
        cameraId: '',
        cameraName: '',
        rtspUrl: '',
        cameraLocation: '',
        xCoordinate: '',
        yCoordinate: '',
        cameraAngle: '',
        cameraFov: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => {
            const updatedFormData = { ...prevState, [name]: value };
            console.log(updatedFormData); // Print the updated form data to console
            return updatedFormData;
        });
    };

    const inputBlockRenderer = (
        labelTxt: string,
        inputType: 'text' | 'number',
        isMandatory: boolean,
        placeHolderTxt: string,
        isDisabled: boolean,
        name: keyof FormFields
    ) => {
        return (
            <div className="input-block">
                <label htmlFor={name}>
                    {labelTxt}{isMandatory && (<mark>*</mark>)}
                </label>
                <input
                    type={inputType}
                    placeholder={placeHolderTxt}
                    disabled={isDisabled}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                />
            </div>
        );
    };

    return (
        <section className="add-camera-details">
            <aside className="left-content">
                <header>Camera details</header>

                <section className="form-block">
                    <div className="form-content">
                        {inputBlockRenderer('Camera ID', 'text', true, 'Enter camera ID', false, 'cameraId')}
                        {inputBlockRenderer('Camera Name', 'text', true, 'Enter camera name', false, 'cameraName')}
                        {inputBlockRenderer('RTSP URL', 'text', true, 'Enter RTSP URL', false, 'rtspUrl')}
                        {inputBlockRenderer('Camera Location', 'text', true, 'Enter camera location', false, 'cameraLocation')}
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
                                {inputBlockRenderer('Camera Angle', 'number', true, 'Enter angle', false, 'cameraAngle')}
                            </section>
                            <section className="column">
                                {inputBlockRenderer('Camera FoV', 'number', true, 'Enter FoV', false, 'cameraFov')}
                            </section>
                        </div>
                    </div>

                </section>

            </aside>

            <article className="main-content">
                {/* <figure>
                    <img src={floorPlan} alt="" />
                </figure> */}
                <ImageWithDraggableIcon imgSrc={floorPlan} />
            </article>
        </section>
    );
}

export default AddCameraDetails;
