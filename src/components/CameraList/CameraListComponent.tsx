import CustomButton from '../CustomButton/CustomButtonComponent';
import RippleEffect from '../RippleEffect/RippleEffect';
import SvgIcon from '../SvgIcons/SvgIconComponent';
import './CameraListComponent.scss';
import floorPlan from '../../assets/images/floor-plan.png';
import CustomDialog from '../CustomDialog/CustomDialogComponent';
import useCustomDialogHandler from '../CustomDialog/useCustomDialogHandler';
import { useEffect, useState } from 'react';
import AddCameraDetails, { FormFieldsType } from '../AddCameraDetails/AddCameraDetailsComponent';
import { CameraConfigType } from '../../sdk/types/cameraConfig.type';

// interface ICameraDetails {
//     id: number;
//     cameraName: string,
// }
interface ICameraList {
    list: CameraConfigType[];
    selectedCamera: CameraConfigType | null;
    updateSelectedCamera: (selected: CameraConfigType) => void;
    addCamera: (cameraFormData: FormFieldsType) => void
}

interface IDialogProps {
    title: string;
    content: JSX.Element;
    dialogMaxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    cancelText: string;
    saveText: string;
    onSave: () => void;
    onCancel: () => void;
}

const CameraList: React.FC<ICameraList> = ({ list, selectedCamera, updateSelectedCamera, addCamera }) => {
    const { openDialog, handleOpenDialog, handleCloseDialog, handleCancelDialog, handleSaveDialog } = useCustomDialogHandler();
    const [cameraToDelete, setCameraToDelete] = useState<CameraConfigType | null>(null);
    const [dialogProps, setDialogProps] = useState<IDialogProps | null>(null);
    const [addCameraFormData, setAddCameraFormData] = useState<FormFieldsType | null>(null);

    const handleListItemClick = (cam: CameraConfigType) => {
        console.log('camera list item clicked', cam);
        updateSelectedCamera(cam);
    }

    const handleListItemDeleteBtnClick = (data: CameraConfigType) => {
        console.log('handleListItemDeleteBtnClick', data);
        setDialogProps({
            title: 'Delete camera',
            content: deleteCameraDialogContent,
            dialogMaxWidth: 'xs',
            cancelText: 'Cancel',
            saveText: 'Delete',
            onSave: () => {
                handleDialogDeleteCameraClick();
            },
            onCancel: () => {
                handleCloseDialog();
            }
        })
        setCameraToDelete(data);
        handleOpenDialog();
    }

    const handleAddCameraBtnClick = () => {
        setDialogProps({
            title: 'Add camera',
            content: addCameraDialogContent,
            dialogMaxWidth: 'lg',
            cancelText: 'Cancel',
            saveText: 'Save',
            onSave: () => {
                handleAddCamera()
                handleCloseDialog();
            },
            onCancel: () => {
                handleCloseDialog();
            }
        })
        handleOpenDialog();
    }

    const handleAddCamera = () => {
        console.log('add camera save button click', addCameraFormData);
        if (addCameraFormData) {
            addCamera(addCameraFormData);
        }
    }

    const handleDialogDeleteCameraClick = () => {
        console.log('delete camera and close the dialog event called');
        setCameraToDelete(null);
        handleCloseDialog();
    }

    const deleteCameraDialogContent: JSX.Element = (
        <section className="delete-cam-dialog-content">
            <header>Are you sure you want to delete Cam#{cameraToDelete?.id}? </header>
            <p>Note: All the incidents associated with Cam#{cameraToDelete?.id} will get deleted</p>
        </section>
    );

    const handleAddCameraDetailsFormChange = (data: FormFieldsType) => {
        console.log('handleAddCameraDetailsFormChange::', data);
        setAddCameraFormData(data);
    }

    const addCameraDialogContent: JSX.Element = (
        <AddCameraDetails onFormChange={handleAddCameraDetailsFormChange} />
    );

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
                onClose={handleCloseDialog}
                onCancel={dialogProps.onCancel}
                onSave={dialogProps.onSave}
            />
        )
    }

    return (
        <>
            <section className="camera-list-container">

                <header className='list-header'>

                    <div>
                        <h4>{list?.length}</h4>
                        <h4>Fixed camera</h4>
                    </div>

                    <aside className="actions">
                        <CustomButton icon={<SvgIcon name='plus' width={16} height={16} />} variant='contained' onClick={() => handleAddCameraBtnClick()} />
                        <CustomButton icon={<SvgIcon name='search' width={16} height={16} />} variant='contained' />
                    </aside>
                </header>

                <aside className="list-content">
                    {
                        list?.length ? (
                            <ul className="list">
                                {
                                    list.map((cam: CameraConfigType, index: number) => (
                                        <RippleEffect as="li" key={cam.id} className={`item ripple-list-item ${selectedCamera?.id === cam?.id ? 'selected' : ''}`} onClick={() => handleListItemClick(cam)}>
                                            <label>{cam.cameraId}</label>
                                            <CustomButton icon={<SvgIcon name='delete' width={16} height={16} />} variant='outlined' onClick={() => handleListItemDeleteBtnClick(cam)} />
                                        </RippleEffect>
                                    ))
                                }
                            </ul>
                        ) : (
                            <div className="no-list-items">
                                <p>No cameras to show.</p>
                                <RippleEffect as="div">
                                    <CustomButton text='Add camera' variant='contained' onClick={() => handleAddCameraBtnClick()} />
                                </RippleEffect>
                            </div>
                        )
                    }

                </aside>

            </section>
            {customDialogRenderer()}
        </>
    );
}

export default CameraList;