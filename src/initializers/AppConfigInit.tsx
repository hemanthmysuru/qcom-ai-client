import { useEffect } from "react";

interface IProps {
    // onConfigLoaded: (config: AppConfig) => void;
    onConfigLoaded: (config: {}) => void;
    onError: (error: string) => void;
}

const AppConfigInit: React.FC<IProps> = ({ onConfigLoaded, onError }) => {

    useEffect(() => {
        const loadConfig = async () => {
            try {
                // const configData = await fetchAppConfig();
                const configData = await { version: '1.0.0.0' };
                // throw new Error('Simulated error');
                onConfigLoaded(configData);
            } catch (e) {
                onError('Error loading app config.');
            }
        }
        loadConfig();
    }, [onConfigLoaded, onError])

    return null; // No UI to render
}

export default AppConfigInit;