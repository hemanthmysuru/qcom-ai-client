import { useEffect, useState } from "react";
import CameraList from "../../components/CameraList/CameraListComponent";
import ConfigAction from "../../components/ConfigAction/ConfigActionComponent";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import './ConfigurationsPage.scss'
import { CameraConfigType } from "../../sdk/types/cameraConfig.type";
import cameraConfigService from "../../sdk/services/cameraConfigService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../sdk/redux/store/store";
import { addCamera, deleteCamera, setCameraList } from "../../sdk/redux/slices/cameraSlice";
import { FormFieldsType } from "../../components/AddCameraDetails/AddCameraDetailsComponent";
import { percentageToScale } from "../../utils/common.util";


const ConfigurationsPage: React.FC = () => {
    const dispatch = useDispatch();
    // const [cameraList, setCameraList] = useState<CameraConfigType[]>([]);
    const cameraList = useSelector((state: RootState) => state.camera.cameraList);
    const [selectedCamera, setSelectedCamera] = useState<CameraConfigType | null>(null);

    useEffect(() => {
        console.log('configuration page');
        const fetchCameraList = async () => {
            try {
                const list: CameraConfigType[] = await cameraConfigService.getAllCameraList();

                setSelectedCamera(list[0] || null);
                dispatch(setCameraList(list));
            } catch (error) {
                console.error(error);
            } finally {
                console.log('API completed');
            }
        }

        fetchCameraList();
    }, [dispatch]);

    useEffect(() => {
        if (selectedCamera == null && cameraList?.length) {
            setSelectedCamera(cameraList[0]);
        }
    }, [cameraList])

    const handleUpdateSelectedCamera = async (selected: CameraConfigType) => {
        try {
            const cameraDetails = await cameraConfigService.getCameraById((selected?.id || '')?.toString());
            if (cameraDetails) {
                setSelectedCamera(cameraDetails);
            }
        } catch (error) {
            console.error("Error fetching camera details:", error);
        }
    }

    const handleAddCamera = async (formData: FormFieldsType) => {
        try {
            const payload: CameraConfigType = {
                ...formData,
                coordinateX: percentageToScale(formData.coordinateX),
                coordinateY: percentageToScale(formData.coordinateY),
                // x_coordinate: 0.2,
                // y_coordinate: 0.6,
                vmsLiveFeedUrl: '',
                primaryImageUrl: ''
            };
            // const addCamera = 
            const addCameraResponse = await cameraConfigService.addCamera(payload);
            dispatch(addCamera(addCameraResponse));
            setSelectedCamera(addCameraResponse);
        } catch (error) {
            console.error("Error adding camera:", error);
        }
    }

    const handleDeleteCamera = async (id: string) => {
        try {
            await cameraConfigService.deleteCameraById(id);
            dispatch(deleteCamera(id));
            if (selectedCamera?.id == id) {
                setSelectedCamera(null);
            }
            // update setSelectedCamera
        } catch (error) {
            console.error("Error deleting camera:", error);
        }
    }

    const listContent = (
        <CameraList
            list={cameraList}
            selectedCamera={selectedCamera}
            updateSelectedCamera={handleUpdateSelectedCamera}
            addCamera={handleAddCamera}
            deleteCamera={handleDeleteCamera}
        />
    );

    const mainContent = (
        <ConfigAction selectedCamera={selectedCamera} />
    );


    return (
        <section className="configurations-page">
            <MainLayout listPosition="left" listContent={listContent} mainContent={mainContent} />
        </section>
    );
}

export default ConfigurationsPage;