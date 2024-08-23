// Define environment-specific configurations
type EnvName = 'development' | 'production' | 'staging';

interface IEnvConfig {
    apiUrl: string;
    env: EnvName;
    endPoints: { [key: string]: string }
}

const endPoints: { [key: string]: any } = {
    auth: {
        categoryUrl: 'admin/user',
        points: {
            login: '/login',
            logout: '/logout'
        }
    },
    cameraConfig: {
        categoryUrl: 'config/camera',
        points: {
            add: '',
            getAll: '',
            getById: '/{id}',
            getByIdAndAlertId: '/{id}/alert/{alertId}',
            delete: '/{id}',
        }
    },
    customAlertConfig: {
        categoryUrl: 'config/custom-alert',
        points: {
            getAllCustomAlertConfig: '/camera/{id}',
            addCustomAlertConfig: '/camera/{id}/all'
        }
    },
    alertConfig: {
        categoryUrl: 'config/alert',
        points: {
            getSafetyConfigList: '/camera/{cameraId}',
            updateSafetyConfig: '/{safetyConfigId}'
        }
    },
    alert: {
        categoryUrl: 'dashboard',
        points: {
            getAlertBannerCountList: '/alerttype',
            getAllAlertsForCameraById: '/alert/{id}', // '/camera/{id}'
            getAllAlerts: '/alert', // this will be changed to '/alert/all'
            getAllCameraDetailsForFloorMap: '/camera',
            getAlertByCameraId: '/alert/camera/{cameraId}',
            updateAlert: '/alert/{alertId}'
        }
    }
};


const devConfig: IEnvConfig = {
    apiUrl: 'http://52.73.179.242:8181/api/v1/',
    env: 'development',
    endPoints: endPoints,
};

const prodConfig: IEnvConfig = {
    apiUrl: 'http://52.73.179.242:8181/api/v1/',
    env: 'production',
    endPoints: endPoints,
};

const stageConfig: IEnvConfig = {
    apiUrl: 'http://52.73.179.242:8181/api/v1/',
    env: 'staging',
    endPoints: endPoints,
};



// Define a type for the allowed environment names

// Create a configuration map
const envConfigDetails: Record<EnvName, IEnvConfig> = {
    development: devConfig,
    production: prodConfig,
    staging: stageConfig,
};

// Safely get the current environment with a fallback
const currentEnv: EnvName = (process.env.REACT_APP_ENV as EnvName) ?? 'development';

// Export the configuration based on the current environment
const envConfig: IEnvConfig = envConfigDetails[currentEnv];

export default envConfig;
