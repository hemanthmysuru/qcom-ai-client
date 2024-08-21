import SvgIcon from "../SvgIcons/SvgIconComponent";
import './SurveillanceCameraComponent.scss';

const SurveillanceCamera: React.FC = () => {
    const camSize = 42;

    const camCoverageSize = camSize * 3;
    const camIconSize = camSize / 3;

    // Styles as constants
    const coverageStyles: React.CSSProperties = {
        width: `${camCoverageSize}px`,
        height: `${camCoverageSize}px`,
    };

    return (
        <section className="surveillance-camera">
            <aside className="coverage" style={coverageStyles}>
            </aside>
            <figure className="camera">
                <SvgIcon name='surveillanceCamera' />
            </figure>
        </section>
    );
}

export default SurveillanceCamera;