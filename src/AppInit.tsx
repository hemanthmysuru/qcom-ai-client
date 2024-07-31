import { useState } from "react"
import App from "./App"
import AppConfigInit from "./initializers/AppConfigInit";
import UserConfigInit from "./initializers/UserConfigInit";

const AppInit: React.FC = () => {

    const [appConfig, setAppConfig] = useState<{} | null>(null);
    const [userConfig, setUserConfig] = useState<{} | null>(null);
    const [error, setError] = useState<string | null>(null);

    if (error) {
        return <section>{error}</section>
    }

    if (!appConfig || !userConfig) {
        return (
            <section>
                <AppConfigInit onConfigLoaded={setAppConfig} onError={setError} />
                <UserConfigInit onConfigLoaded={setUserConfig} onError={setError} />
                <div>Loading...</div>
            </section>
        );
    }

    return (
        <App appConfig={appConfig} userConfig={userConfig} />
    )
}

export default AppInit;