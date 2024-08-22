import { useEffect, useMemo, useState } from "react";
import { CustomAlertConfigPayloadType, CustomAlertConfigType } from "../../sdk/types/customAlertConfig.type";
import CustomCheckbox from "../CustomCheckbox/CustomCheckboxComponent";
import CustomButton from "../CustomButton/CustomButtonComponent";
import CustomSelect from "../CustomSelect/CustomSelectComponent";
import useCustomDialogHandler, { IDialogProps } from "../CustomDialog/useCustomDialogHandler";
import { CameraConfigType } from "../../sdk/types/cameraConfig.type";
import Quadrilateral, { defaultCoordinateList } from "../Quadrilateral/QuadrilateralComponent";
import floorHotspotVideo from '../../assets/videos/floor-hotspot1.mp4';
import floorHotspotImage from '../../assets/images/floor-hotspot1.png';
import CustomDialog from "../CustomDialog/CustomDialogComponent";
import './CustomAlertConfigComponent.scss';
import customAlertConfigService from "../../sdk/services/customAlertConfigService";
import { updateCoordinateListFromPercentageToScale, updateCoordinateListFromScaleToPercentage } from "../../utils/common.util";
import SvgIcon, { iconNameTypes } from "../SvgIcons/SvgIconComponent";

const shapeList = [
    {
        name: 'rectangle',
        iconName: 'shapeRectangle'
    }
]

interface ICustomAlertConfigProps {
    selectedCamera: CameraConfigType;
}

const CustomAlertConfig: React.FC<ICustomAlertConfigProps> = ({ selectedCamera }) => {
    const { openDialog, handleOpenDialog, handleCloseDialog, handleCancelDialog, handleSaveDialog } = useCustomDialogHandler();
    const [customAlertConfigDetails, setCustomAlertConfigDetails] = useState<CustomAlertConfigType[]>([]);
    const [isCreateCustomAlertEnabled, setIsCreateCustomAlertEnabled] = useState<boolean>(false);
    const [dialogProps, setDialogProps] = useState<IDialogProps | null>(null);
    const [selectedShapeToDraw, setSelectedShapeToDraw] = useState<string | null>(null);
    const [formData, setFormData] = useState<CustomAlertConfigPayloadType>({
        alertName: '',
        regionName: '',
        alertType: 'occupancy_changed',
        enabled: false,
        severity: 'Severity Level 1',
        params: [],
        coordinates: []
    })

    useEffect(() => {
        console.log(selectedCamera);
        setSelectedShapeToDraw(null);
        const fetchSafetyConfigList = async () => {
            try {
                if (selectedCamera?.id) {
                    const alertConfig = await customAlertConfigService.getAllCustomAlert(selectedCamera?.id);
                    console.log(alertConfig);
                    setCustomAlertConfigDetails(alertConfig);
                }
            } catch (error) {

            } finally {

            }
        }
        fetchSafetyConfigList();
    }, [selectedCamera]);

    useEffect(() => {
        proximityAreaDialog();
    }, [selectedShapeToDraw])

    const updateFormDatabyNameAndValue = (name: string, value: any) => {
        setFormData(prevState => {
            const updatedFormData = {
                ...prevState,
                [name]: value,
            };
            return updatedFormData;
        })
    }

    const handleOnChangeCustomAlertCheckbox = (checked: boolean) => {
        console.log('handleOnChangeCustomAlertCheckbox:: ', checked);
        setIsCreateCustomAlertEnabled(checked);
    }

    const handleCoordinatesChange = (points: { x: number; y: number }[]) => {
        console.log('Updated Coordinates:', points);
        // You can perform further actions with the updated coordinates here
        // percentageToScale();
        const updatedPoints = updateCoordinateListFromPercentageToScale(points);
        console.log('updatedPoints:: ', updatedPoints);
        updateFormDatabyNameAndValue('coordinates', updatedPoints);
    };

    const handleOnShapeSelectedToDraw = (shapeName: string) => {
        console.log(shapeName);
        setSelectedShapeToDraw(shapeName);
    }

    const proximityAreaRenderer = () => {
        return (
            <section className="proximity-area">
                <header className="shapes">
                    <label>Area types:</label>
                    <ul>
                        {
                            shapeList.map((data, index: number) => (
                                <li key={data.name}
                                    onClick={() => handleOnShapeSelectedToDraw(data?.name)}
                                    className={selectedShapeToDraw == data?.name ? 'selected' : ''}>
                                    <SvgIcon name={data.iconName as iconNameTypes} />
                                </li>
                            ))
                        }
                    </ul>
                </header>
                <div className="content">
                    <Quadrilateral
                        mediaType="video"
                        pointsVisible={!!selectedShapeToDraw}
                        mediaSrc={floorHotspotVideo}
                        defaultCoordinates={defaultCoordinateList}
                        showLinesAndFill={!!selectedShapeToDraw}
                        onCoordinatesChange={handleCoordinatesChange} />
                </div>
            </section>
        )
    }

    const proximityAreaDialog = () => {
        setDialogProps({
            title: `Create Proximity Area - Cam ID - ${selectedCamera?.cameraId}, Production Zone`,
            content: proximityAreaRenderer(),
            dialogMaxWidth: 'md',
            isSaveDisabled: false,
            cancelText: 'Cancel',
            saveText: 'Save',
            onSave: () => {
                // handleAddCamera()
                handleCloseDialog();
            },
            onCancel: () => {
                handleCloseDialog();
            }
        })
    }

    const handleCreateProximityAreaBtnClick = () => {
        proximityAreaDialog();
        handleOpenDialog();
    }

    const customDialogRenderer = () => {
        if (!dialogProps) return null;
        return (
            <CustomDialog
                headerLabel={dialogProps.title}
                open={openDialog}
                content={dialogProps.content}
                dialogMaxWidth={dialogProps?.dialogMaxWidth || 'md'}
                cancelText={dialogProps.cancelText}
                saveText={dialogProps.saveText}
                isSaveDisabled={false}
                onClose={handleCloseDialog}
                onCancel={dialogProps.onCancel}
                onSave={dialogProps.onSave}
            />
        )
    }

    const handleChangeAlertName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateFormDatabyNameAndValue('alertName', value);
        updateFormDatabyNameAndValue('regionName', value);
    };

    const validateForm = (): boolean => {
        const { alertName, coordinates, regionName, severity } = formData;
        return (
            alertName?.trim() !== '' &&
            regionName?.trim() !== '' &&
            coordinates?.length > 0 &&
            severity?.trim() !== ''
        );
    }

    const submitCustomAlertConfigForm = async () => {
        if (selectedCamera?.id) {
            const response = await customAlertConfigService.addCustomAlertConfig(selectedCamera?.id, formData);
            console.log('customAlertConfig::Response::', response);
        }
    }

    const drawnProximityAreaRenderer = useMemo(() => {
        let updatedPoints = null;
        if (customAlertConfigDetails?.length && customAlertConfigDetails[0]?.region) {
            const { coordinates } = customAlertConfigDetails[0]?.region;
            updatedPoints = updateCoordinateListFromScaleToPercentage(coordinates);
        }
        console.log('updatedPoints:: ', updatedPoints);

        if (updatedPoints?.length) {
            return (
                <Quadrilateral
                    mediaType="video"
                    pointsVisible={false}
                    mediaSrc={floorHotspotVideo}
                    defaultCoordinates={updatedPoints}
                    showLinesAndFill={!!updatedPoints?.length} />
            );
        }
        return (
            <Quadrilateral
                mediaType="video"
                pointsVisible={false}
                mediaSrc={floorHotspotVideo}
                showLinesAndFill={!!updatedPoints?.length} />
        );

    }, [customAlertConfigDetails, handleCoordinatesChange])

    const customAlertRenderer = () => {

        return (
            <>
                <section className="cam-view">
                    <header className='alert-action-header'>
                        <article>
                            <CustomCheckbox
                                checked={isCreateCustomAlertEnabled}
                                onChange={handleOnChangeCustomAlertCheckbox} />
                            <span>Custom Alerts - Detection Zone </span>
                        </article>

                        <CustomButton
                            text='Create Proximity Area'
                            disabled={!isCreateCustomAlertEnabled}
                            onClick={handleCreateProximityAreaBtnClick} />
                    </header>

                    <figure>
                        {/* <img src={floorHotspotImage} alt="" /> */}
                        {drawnProximityAreaRenderer}
                    </figure>
                </section>

                <aside className="alert-details">
                    <header>Alert details</header>
                    <div className="input-block">
                        <label>Alert name</label>
                        <input type="text" name=""
                            placeholder="Enter alert name"
                            onChange={handleChangeAlertName}
                            disabled={!isCreateCustomAlertEnabled} />
                    </div>
                    <div className="input-block">
                        <label>Severity level</label>
                        <CustomSelect
                            options={['Severity Level 1']}
                            placeholder={'Select security level'}
                            disabled={!isCreateCustomAlertEnabled}
                            selectedOption={formData.severity}
                            onChange={(option: string): void => {
                                console.log(option)
                            }} />
                    </div>
                </aside>
            </>
        )
    };

    return (
        <>
            <section className="custom-alert-config">
                <section className="custom-alert-block">
                    {customAlertRenderer()}
                </section>
                <aside className="custom-alert-action">
                    <CustomButton text='Save Configuration' disabled={!validateForm()} onClick={submitCustomAlertConfigForm} />
                </aside>
            </section>
            {customDialogRenderer()}
        </>
    );
}

export default CustomAlertConfig;