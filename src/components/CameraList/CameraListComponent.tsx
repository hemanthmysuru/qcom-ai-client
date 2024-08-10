import CustomButton from '../CustomButton/CustomButtonComponent';
import RippleEffect from '../RippleEffect/RippleEffect';
import SvgIcon from '../SvgIcons/SvgIconComponent';
import './CameraListComponent.scss';
import floorPlan from '../../assets/images/floor-plan.png';
import CustomDialog from '../CustomDialog/CustomDialogComponent';
import useCustomDialogHandler from '../CustomDialog/useCustomDialogHandler';
import { useState } from 'react';
import AddCameraDetails, { FormFieldsType } from '../AddCameraDetails/AddCameraDetailsComponent';

interface ICameraDetails {
    id: number;
    name: string,
}
interface ICameraList {
    list: ICameraDetails[];
}

const cameraList: ICameraList = {
    list: [
        { id: 1, name: 'Cam ID - Camera #1' }, { id: 2, name: 'Cam ID - Camera #2' }, { id: 3, name: 'Cam ID - Camera #2' },
        { id: 4, name: 'Cam ID - Camera #2' }, { id: 5, name: 'Cam ID - Camera #2' }, { id: 6, name: 'Cam ID - Camera #2' },
        { id: 7, name: 'Cam ID - Camera #2' }, { id: 8, name: 'Cam ID - Camera #2' }, { id: 9, name: 'Cam ID - Camera #2' },
        { id: 10, name: 'Cam ID - Camera #2' }, { id: 11, name: 'Cam ID - Camera #2' }, { id: 12, name: 'Cam ID - Camera #2' },
        { id: 13, name: 'Cam ID - Camera #2' }, { id: 14, name: 'Cam ID - Camera #2' }, { id: 15, name: 'Cam ID - Camera #2' },
    ]
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

const CameraList: React.FC = () => {

    const { openDialog, handleOpenDialog, handleCloseDialog, handleCancelDialog, handleSaveDialog } = useCustomDialogHandler();
    const [cameraToDelete, setCameraToDelete] = useState<ICameraDetails | null>(null);
    const [dialogProps, setDialogProps] = useState<IDialogProps | null>(null);

    const handleListItemClick = (event: any) => {
        console.log('camera list item clicked', event);
    }

    const handleListItemDeleteBtnClick = (data: ICameraDetails) => {
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
                console.log('add camera save button click');
            },
            onCancel: () => {
                handleCloseDialog();
            }
        })
        handleOpenDialog();
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
                        <h4>{cameraList?.list?.length}</h4>
                        <h4>Fixed camera</h4>
                    </div>

                    <aside className="actions">
                        <CustomButton icon={<SvgIcon name='plus' width={16} height={16} />} variant='contained' onClick={() => handleAddCameraBtnClick()} />
                        <CustomButton icon={<SvgIcon name='search' width={16} height={16} />} variant='contained' />
                    </aside>
                </header>

                <aside className="list-content">
                    <ul className="list">
                        {
                            cameraList.list.map((cam: ICameraDetails, index: number) => (
                                <RippleEffect as="li" key={cam.id} className={`item ripple-list-item ${index === 0 ? 'selected' : ''}`} onClick={() => handleListItemClick(index)}>
                                    <label>{cam.name}</label>
                                    <CustomButton icon={<SvgIcon name='delete' width={16} height={16} />} variant='outlined' onClick={() => handleListItemDeleteBtnClick(cam)} />
                                </RippleEffect>
                            ))
                        }

                    </ul>
                </aside>

            </section>
            {customDialogRenderer()}
        </>
    );
}

export default CameraList;