import Pin from '../Pin/PinComponent';
import SvgIcon from '../SvgIcons/SvgIconComponent';
import './CameraViewComponent.scss';

interface ICameraView {
    cameraAngle: number;
    fieldOfView: number;
}

const CameraView: React.FC<ICameraView> = ({ cameraAngle, fieldOfView }) => {
    // Ensure cameraAngle and fieldOfView are within the 0 to 359 range
    const validatedCameraAngle = Math.max(0, Math.min(cameraAngle, 360));
    const validatedFieldOfView = Math.max(0, Math.min(fieldOfView, 360));

    return (
        <section className="camera-view">
            <aside className="coverage" style={{ '--camera-angle': `${cameraAngle}deg`, '--field-of-view-angle': `${fieldOfView}deg` } as React.CSSProperties}>
                <figure className='camera' style={{ '--camera-angle': `${validatedCameraAngle}deg` } as React.CSSProperties}>
                    <SvgIcon
                        name='camera'
                        width={16}
                        height={16}
                    />
                </figure>
            </aside>
            <Pin text='10' />
            {/* <div>
                <p>Camera Angle: {validatedCameraAngle}°</p>
                <p>Field of View: {validatedFieldOfView}°</p>
            </div> */}
        </section>
    );
}

export default CameraView;
