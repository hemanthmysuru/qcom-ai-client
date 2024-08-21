import envConfig from "../../EnvConfig";
import apiService from "../core/apiService";
import { AlertConfigType } from "../types/alertConfig.type";
import { validateEndpoint } from "../utils/utils";

const mockAlertConfigList: AlertConfigType[] = [
    {
        "id": "694e9c693d6c490981bb3edf70613267",
        "alertName": " fall down",
        "alertType": "required_accessories",
        "enabled": false,
        "accessories": [
            "vest",
            " goges "
        ],
        "cameraFk": "b269e58bd4264b6aabec26679fc61703",
        "cameraId": "camera0201",
        "cameraName": "my camera",
        "severity": "medium"
    },
    {
        "id": "6a8ece5834a04440926c92cd879e1f0b",
        "alertName": " bridge stone",
        "alertType": "required_accessories",
        "enabled": true,
        "accessories": [
            "hardhats"
        ],
        "cameraFk": "b269e58bd4264b6aabec26679fc61703",
        "cameraId": "camera0201",
        "cameraName": "my camera",
        "severity": "medium"
    },
    {
        "id": "d1779fbdec3e46c3a0aa0abed6c83585",
        "alertName": " bridge stone",
        "alertType": "required_accessories",
        "enabled": true,
        "accessories": [
            "hardhats",
            "vest"
        ],
        "cameraFk": "b269e58bd4264b6aabec26679fc61703",
        "cameraId": "camera0201",
        "cameraName": "my camera",
        "severity": "medium"
    }
]

class AlertConfigService {

    private endPoints: { [key: string]: any };
    private endPointCategory: string;

    constructor() {
        this.endPoints = envConfig?.endPoints || {};
        this.endPointCategory = 'alertConfig';
    }

    public async getSafetyConfigList(cameraId: string): Promise<AlertConfigType[]> {
        try {
            const url = validateEndpoint(this.endPoints, this.endPointCategory, 'getSafetyConfigList', { cameraId })
            return await apiService.get(url);
        } catch (error) {
            console.error('Error getting safety configuration:', error);
            throw error;
        }

        // // Simulating with a delay and mock data. And network latency
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        // return mockAlertConfigList;
    }

    public async updateSafetyConfig(safetyConfigId: string, payload: any): Promise<AlertConfigType> {
        try {
            const url = validateEndpoint(this.endPoints, this.endPointCategory, 'updateSafetyConfig', { safetyConfigId })
            return await apiService.patch(url, payload);
        } catch (error) {
            console.error('Error updating safety configuration:', error);
            throw error;
        }
    }

}

// Export a singleton instance of the AuthService class
const alertConfigService = new AlertConfigService();
export default alertConfigService;