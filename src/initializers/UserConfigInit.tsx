import { useEffect } from "react";

interface IProps {
    // onConfigLoaded: (config: UserConfig) => void;
    onConfigLoaded: (config: {}) => void;
    onError: (error: string) => void;
}

const UserConfigInit: React.FC<IProps> = ({ onConfigLoaded, onError }) => {

    useEffect(() => {

        const loadConfig = async () => {
            try {
                // const configData = await fetchUserConfig();
                const configData = await { role: 'admin' };
                onConfigLoaded(configData);
            } catch (e) {
                onError('Error loading user config.');
            }
        }
        loadConfig();
    }, [onConfigLoaded, onError])

    return null;
}

export default UserConfigInit;