import CameraList from "../../components/CameraList/CameraListComponent";
import ConfigAction from "../../components/ConfigAction/ConfigActionComponent";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import './ConfigurationsPage.scss'

const ConfigurationsPage: React.FC = () => {

    const listContent = (
        <CameraList />
    );

    const mainContent = (
        // <>
        //     main content
        // </>
        <ConfigAction />
    );


    return (
        <section className="configurations-page">
            <MainLayout listPosition="left" listContent={listContent} mainContent={mainContent} />
        </section>
    );
}

export default ConfigurationsPage;