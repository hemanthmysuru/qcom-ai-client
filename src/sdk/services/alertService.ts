import envConfig from "../../EnvConfig";
import apiService from "../core/apiService";
import { AlertDetailsType } from "../types/alert.type";
import { CameraDetailsInFloorMapType } from "../types/cameraConfig.type";
import { validateEndpoint } from "../utils/utils";

class AlertService {

    private endPoints: { [key: string]: any };
    private endPointCategory: string;

    constructor() {
        this.endPoints = envConfig?.endPoints || {};
        this.endPointCategory = 'alert';
    }

    public async getAllAlerts(): Promise<AlertDetailsType[]> {
        try {
            const url = validateEndpoint(this.endPoints, this.endPointCategory, 'getAllAlerts')
            return await apiService.get(url);
        } catch (error) {
            console.error('Error getting safety configuration:', error);
            throw error;
        }

        // // Simulating with a delay and mock data. And network latency
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        // return mockAlertConfigList;
    }

    public async getAllAlertsForCameraById(id: string): Promise<AlertDetailsType[]> {
        try {
            const url = validateEndpoint(this.endPoints, this.endPointCategory, 'getAllAlertsForCameraById', { id })
            return await apiService.get(url);
        } catch (error) {
            console.error('Error getting safety configuration:', error);
            throw error;
        }

        // // Simulating with a delay and mock data. And network latency
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        // return mockAlertConfigList;
    }

    public async getAllFloorMapCameraDetails(): Promise<CameraDetailsInFloorMapType[]> {
        try {
            const url = validateEndpoint(this.endPoints, this.endPointCategory, 'getAllCameraDetailsForFloorMap')
            return await apiService.get(url);
        } catch (error) {
            console.error('Error getting safety configuration:', error);
            throw error;
        }

        // // Simulating with a delay and mock data. And network latency
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        // return mockAlertConfigList;
    }

}

const alertService = new AlertService();
export default alertService;