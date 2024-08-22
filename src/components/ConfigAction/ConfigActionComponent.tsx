import CustomCheckbox from '../CustomCheckbox/CustomCheckboxComponent';
import CustomSelect from '../CustomSelect/CustomSelectComponent';
import './ConfigActionComponent.scss';
// import floorPlanImage from '../../assets/images/floor-plan.png';
import floorPlanImage from '../../assets/svgs/floor-plan.svg';
import ImageWithDraggableIcon from '../ImageWithDraggableIcon/ImageWithDraggableIconComponent';
import floorHotspotImage from '../../assets/images/floor-hotspot1.png';
import ZoomableCanvas from '../zoomableCanvas/ZoomableCanvasComponent';
import ZoomablePage from '../zoomable/ZoomablePage';
import CameraView from '../CameraView/CameraViewComponent';
import { CameraConfigType } from '../../sdk/types/cameraConfig.type';
import RippleEffect from '../RippleEffect/RippleEffect';
import { useEffect, useState } from 'react';
import { AlertConfigType } from '../../sdk/types/alertConfig.type';
import alertConfigService from '../../sdk/services/alertConfigService';
import SurveillanceCamera from '../SurveillanceCamera/SurveillanceCameraComponent';
import { scaleToPercentage } from '../../utils/common.util';
import customAlertConfigService from '../../sdk/services/customAlertConfigService';
import { CustomAlertConfigType } from '../../sdk/types/customAlertConfig.type';
import CustomAlertConfig from '../CustomAlertConfig/CustomAlertConfigComponent';

const listOptions = [
    { id: 1, alertName: 'PPE - No hard hat', options: ['Severity Level 1'], enabled: false, selected: 'Severity Level 1' },
    { id: 2, alertName: 'PPE - No safety vest', options: ['Severity Level 1'], enabled: true, selected: 'Severity Level 1' },
    { id: 3, alertName: 'PPE - No safety goggles', options: ['Severity Level 1'], enabled: false, selected: 'Severity Level 1' },
    { id: 4, alertName: 'PPE - No safety gloves', options: ['Severity Level 1'], enabled: true, selected: 'Severity Level 1' },
    { id: 5, alertName: 'PPE - No mask', options: ['Severity Level 1'], enabled: true, selected: 'Severity Level 1' },
]

interface IConfigActionProps {
    selectedCamera: CameraConfigType | null;
}

const ConfigAction: React.FC<IConfigActionProps> = ({ selectedCamera }) => {
    const [safetyConfigList, setSafetyConfigList] = useState<AlertConfigType[]>([]);

    useEffect(() => {
        console.log(selectedCamera);
        const fetchSafetyConfigList = async () => {
            try {
                if (selectedCamera?.id) {
                    const list: AlertConfigType[] = await alertConfigService.getSafetyConfigList(selectedCamera?.id);
                    // const list: CameraConfigType[] = mockCameraList;
                    // setSelectedCamera(list[0] || null);
                    setSafetyConfigList(list);
                }
            } catch (error) {

            } finally {

            }
        }
        fetchSafetyConfigList();
    }, [selectedCamera]);

    const dynamicComponents = () => {
        const { coordinateX, coordinateY } = selectedCamera || {} as CameraConfigType;
        const x = scaleToPercentage(coordinateX);
        const y = scaleToPercentage(coordinateY);
        return [
            {
                component: (
                    // <CameraView
                    //     svgIconName='surveillanceCamera'
                    //     cameraAngle={selectedCamera?.cameraAngle || 0}
                    //     fieldOfView={selectedCamera?.fieldOfView || 0}
                    //     showPin={false}
                    // />
                    <SurveillanceCamera />
                    // ), position: { x: '30%', y: '50%' }
                ), position: { x, y }
                // ), position: { x: (selectedCamera?.x_coordinate || 0)?.toString(), y: (selectedCamera?.y_coordinate || 0)?.toString() }
            },
        ]
    }

    const cameraZoneRenderer = (
        <aside className="camera-location">
            <header>Camera Location - {selectedCamera?.location}</header>
            <figure>
                {/* <ImageWithDraggableIcon
                        imgSrc={floorPlanImage}
                        cameraAngle={145}
                        cameraFieldOfView={190}
                        iconPosition={{ x: 90, y: 245 }} // Pass initial position
                        onPositionChange={(position) => console.log('New position:', position)}
                        isDragging={false}
                    /> */}
                {/* <ZoomableCanvas
                        imgSrc={floorPlanImage}
                        // cameraAngle={0}
                        // cameraFieldOfView={0}
                        // onPositionChange={handleIconPositionChange}
                        camCreatable={false}
                        cameraViewsData={[{ x: 300, y: 200, cameraAngle: 45, cameraFieldOfView: 75, pinTxt: '2' },
                        ]}
                    /> */}
                <ZoomablePage
                    components={dynamicComponents()}
                    showZoomControls={false}
                    isImageDraggable={false}
                    isCamCreationAllowed={false} />
            </figure>
        </aside>
    );

    const modifyAlertRenderer = (
        <ul className="selection-list">
            {
                listOptions?.map((config: any, index: number) => (
                    <li key={index}>

                        <article>
                            <CustomCheckbox checked={config?.enabled} />
                            <span>{config.alertName}</span>
                        </article>
                        <CustomSelect
                            options={config.options}
                            selectedOption={config.selected}
                            placeholder={'Select security level'}
                            onChange={(option: string): void => {
                                console.log(option)
                            }} />
                    </li>
                ))
            }
        </ul>
    );

    return (
        <section className="config-action">
            {
                selectedCamera?.id ? (
                    <>
                        <header className="config-action-header">
                            <label>Cam ID - Camera {selectedCamera?.id} - Configuration</label>
                        </header>

                        <article className="action-list-and-zone">
                            {modifyAlertRenderer}
                            {cameraZoneRenderer}
                        </article>

                        <CustomAlertConfig selectedCamera={selectedCamera} />
                    </>
                ) : (
                    <section className="no-camera-selected">
                        <p>No camera selected</p>
                        {/* <RippleEffect as="div">
                            <CustomButton text='Add camera' variant='contained' onClick={() => console.log('add camera')} />
                        </RippleEffect> */}
                    </section>
                )
            }
        </section >
    );
}

export default ConfigAction;