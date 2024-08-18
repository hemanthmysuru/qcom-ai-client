import envConfig from "../../EnvConfig";
import apiService from "../core/apiService";
import { CameraConfigType } from "../types/cameraConfig.type";
import { validateEndpoint } from "../utils/utils";

const fieldNameList = {
    id: 'id',
    cameraId: 'cameraId',
    cameraName: 'cameraName',
    location: 'location',
    xCoordinate: 'x_coordinate',
    yCoordinate: 'y_coordinate',
    cameraAngle: 'cameraAngle',
    fieldOfView: 'fieldOfView',
    vmsLiveFeedUrl: 'vmsLiveFeedUrl',
    primaryImageUrl: 'primaryImageUrl',
    createdBy: 'createdBy',
    updatedBy: 'updatedBy',
    lastModifiedDate: 'lastModifiedDate',
};

const mockCameraList: CameraConfigType[] = [
    {
        "id": 6,
        "cameraName": "moveable",
        "cameraId": "camera0200",
        "location": "detectionZone",
        "x_coordinate": 10,
        "y_coordinate": 10,
        "cameraAngle": 90,
        "fieldOfView": 180,
        "vmsLiveFeedUrl": "http://videocamera13.vid",
        "primaryImageUrl": "http://image.video13.cam",
        "createdBy": "Admin",
        "updatedBy": "Admin",
        "createdDate": 1722684018285,
        "lastModifiedDate": 1722684018285
    },
    {
        "id": 7,
        "cameraName": "moveable",
        "cameraId": "camera0201",
        "location": "detectionZone",
        "x_coordinate": 10,
        "y_coordinate": 10,
        "cameraAngle": 90,
        "fieldOfView": 180,
        "vmsLiveFeedUrl": "http://videocamera13.vid",
        "primaryImageUrl": "http://image.video13.cam",
        "createdBy": "Admin",
        "updatedBy": "Admin",
        "createdDate": 1722684048135,
        "lastModifiedDate": 1722684048135
    }
]

class CameraConfigService {

    private endPoints: { [key: string]: any };
    private endPointCategory: string;

    constructor() {
        this.endPoints = envConfig?.endPoints || {};
        this.endPointCategory = 'cameraConfig';
    }

    public async addCamera(payload: CameraConfigType): Promise<CameraConfigType> {
        try {
            const url = validateEndpoint(this.endPoints, this.endPointCategory, 'add');
            return await apiService.post<CameraConfigType>(url, payload);
        } catch (error) {
            throw error;
        }
    }

    public async getAllCameraList(): Promise<CameraConfigType[]> {
        try {
            const url = validateEndpoint(this.endPoints, this.endPointCategory, 'getAll');
            return await apiService.get<CameraConfigType[]>(url);
        } catch (error) {
            console.error("Error fetching camera list:", error);
            throw error;
        }

        // // Simulating with a delay and mock data. And network latency
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        // return mockCameraList;
    }

    public async getCameraById(id: string): Promise<CameraConfigType> {
        try {
            let url = validateEndpoint(this.endPoints, this.endPointCategory, 'getById', { id });
            return await apiService.get<CameraConfigType>(url);
        } catch (error) {
            console.error("Error fetching camera list:", error);
            throw error;
        }

        // await new Promise((resolve) => setTimeout(resolve, 1000));
        // return mockCameraList.find((cam: CameraConfigType) => cam?.id == parseInt(id)) || {} as CameraConfigType;
    }

    public async deleteCameraById(id: string): Promise<void> {
        try {
            const url = validateEndpoint(this.endPoints, this.endPointCategory, 'delete', { id });
            return await apiService.delete(url);
        } catch (error) {
            console.error('Error deleting camera:', error);
            throw error;
        }
    }

    // To test the multiple id replacement
    // public async getCameraByIdAndAlertId(cameraId: string, alertId: string): Promise<CameraConfigType> {
    //     try {
    //         let url = validateEndpoint(this.endPoints, this.endPointCategory, 'getByIdAndAlertId', { id: cameraId, alertId });
    //         return await apiService.get<CameraConfigType>(url);
    //     } catch (error) {
    //         console.error(`Error fetching camera by ID ${cameraId} and alert ID ${alertId}:`, error);
    //         throw error;
    //     }
    // }


}
// Export a singleton instance of the AuthService class
const cameraConfigService = new CameraConfigService();
export default cameraConfigService;