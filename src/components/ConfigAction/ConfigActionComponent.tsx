import CustomCheckbox from '../CustomCheckbox/CustomCheckboxComponent';
import CustomSelect from '../CustomSelect/CustomSelectComponent';
import './ConfigActionComponent.scss';
// import floorPlanImage from '../../assets/images/floor-plan.png';
import floorPlanImage from '../../assets/svgs/floor-plan.svg';
import ImageWithDraggableIcon from '../ImageWithDraggableIcon/ImageWithDraggableIconComponent';
import CustomButton from '../CustomButton/CustomButtonComponent';
import floorHotspotImage from '../../assets/images/floor-hotspot1.png';
import ZoomableCanvas from '../zoomableCanvas/ZoomableCanvasComponent';

const listOptions = [
    { label: 'PPE - No hard hat', options: [] },
    { label: 'PPE - No safety vest', options: [] },
    { label: 'PPE - No safety goggles', options: [] },
    { label: 'PPE - No safety gloves', options: [] },
    { label: 'PPE - No mask', options: [] },
]

const ConfigAction: React.FC = () => {

    return (
        <section className="config-action">

            <header className="config-action-header">
                <label>Cam ID - Camera #1 - Configuration</label>
            </header>

            <article className="action-list-and-zone">
                <ul className="selection-list">

                    {
                        listOptions.map((val: { label: string, options: Array<any> }, index: number) => (
                            <li key={index}>

                                <article>
                                    <CustomCheckbox />
                                    <span>{val.label}</span>
                                </article>
                                <CustomSelect
                                    options={val.options}
                                    placeholder={'Select security level'}
                                    selectedOption={''} onChange={(option: string): void => {
                                        console.log(option)
                                    }} />
                            </li>
                        ))
                    }

                </ul>

                <aside className="camera-location">
                    <header>Camera Location - Packaging, Zone 1</header>
                    <figure>
                        {/* <ImageWithDraggableIcon
                            imgSrc={floorPlanImage}
                            cameraAngle={145}
                            cameraFieldOfView={190}
                            iconPosition={{ x: 90, y: 245 }} // Pass initial position
                            onPositionChange={(position) => console.log('New position:', position)}
                            isDragging={false}
                        /> */}
                        <ZoomableCanvas
                            imgSrc={floorPlanImage}
                            // cameraAngle={0}
                            // cameraFieldOfView={0}
                            // onPositionChange={handleIconPositionChange}
                            camCreatable={false}
                            cameraViewsData={[{ x: 300, y: 200, cameraAngle: 45, cameraFieldOfView: 75, pinTxt: '2' },
                            ]}
                        />
                    </figure>
                </aside>
            </article>

            <footer className="custom-alert-block">


                <section className="cam-view">
                    <header className='alert-action-header'>
                        <article>
                            <CustomCheckbox />
                            <span>Custom Alerts - Detection Zone </span>
                        </article>

                        <CustomButton text='Create Proximity Area' />
                    </header>

                    <figure>
                        <img src={floorHotspotImage} alt="" />
                    </figure>
                </section>

                <aside className="alert-details">
                    <header>Alert details</header>
                    <div className="input-block">
                        <label>Alert name</label>
                        <input type="text" name="" placeholder="Enter alert name" />
                    </div>
                    <div className="input-block">
                        <label>Severity level</label>
                        <CustomSelect
                            options={[]}
                            placeholder={'Select security level'}
                            selectedOption={''} onChange={(option: string): void => {
                                console.log(option)
                            }} />
                    </div>
                </aside>

            </footer>

        </section>
    );
}

export default ConfigAction;