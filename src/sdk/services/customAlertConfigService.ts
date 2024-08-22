import envConfig from "../../EnvConfig";
import apiService from "../core/apiService";
import { CustomAlertConfigPayloadType, CustomAlertConfigType, mockAllCustomAlerts } from "../types/customAlertConfig.type";
import { validateEndpoint } from "../utils/utils";

class CustomAlertConfigService {

    private endPoints: { [key: string]: any };
    private endPointCategory: string;

    constructor() {
        this.endPoints = envConfig?.endPoints || {};
        this.endPointCategory = 'customAlertConfig';
    }

    public async getAllCustomAlert(id: string): Promise<CustomAlertConfigType[]> {
        try {
            const url = validateEndpoint(this.endPoints, this.endPointCategory, 'getAllCustomAlertConfig', { id });
            return await apiService.get<CustomAlertConfigType[]>(url);
        } catch (error) {
            console.error("Error fetching camera list:", error);
            throw error;
        }

        // // Simulating with a delay and mock data. And network latency
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        // return mockAllCustomAlerts;
    }

    public async addCustomAlertConfig(id: string, payload: CustomAlertConfigPayloadType) {
        try {
            const url = validateEndpoint(this.endPoints, this.endPointCategory, 'addCustomAlertConfig', { id });
            return await apiService.post<CustomAlertConfigType>(url, payload);
        } catch (error) {
            throw error;
        }
    }

}

// Export a singleton instance of the AuthService class
const customAlertConfigService = new CustomAlertConfigService();
export default customAlertConfigService;