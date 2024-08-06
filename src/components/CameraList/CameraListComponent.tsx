import CustomButton from '../CustomButton/CustomButtonComponent';
import RippleEffect from '../RippleEffect/RippleEffect';
import SvgIcon from '../SvgIcons/SvgIconComponent';
import './CameraListComponent.scss';

interface ICameraDetails {
    id: number;
    name: string,
}
interface ICameraList {
    list: ICameraDetails[];
}

const cameraList: ICameraList = {
    list: [
        { id: 1, name: 'Cam ID - Camera #1' }, { id: 2, name: 'Cam ID - Camera #2' }, { id: 3, name: 'Cam ID - Camera #2' },
        { id: 4, name: 'Cam ID - Camera #2' }, { id: 5, name: 'Cam ID - Camera #2' }, { id: 6, name: 'Cam ID - Camera #2' },
        { id: 7, name: 'Cam ID - Camera #2' }, { id: 8, name: 'Cam ID - Camera #2' }, { id: 9, name: 'Cam ID - Camera #2' },
        { id: 10, name: 'Cam ID - Camera #2' }, { id: 11, name: 'Cam ID - Camera #2' }, { id: 12, name: 'Cam ID - Camera #2' },
        { id: 13, name: 'Cam ID - Camera #2' }, { id: 14, name: 'Cam ID - Camera #2' }, { id: 15, name: 'Cam ID - Camera #2' },
    ]
}

const CameraList: React.FC = () => {

    return (
        <section className="camera-list-container">
            <header className='list-header'>
                <label>24 Fixed camera</label>

                <aside className="actions">
                    <CustomButton icon={<SvgIcon name='plus' width={16} height={16} />} variant='contained' />
                    <CustomButton icon={<SvgIcon name='search' width={16} height={16} />} variant='contained' />
                </aside>
            </header>
            <ul className="list">
                {
                    cameraList.list.map((cam: ICameraDetails, index: number) => (
                        <RippleEffect as="li" key={cam.id} className={`item ripple-list-item ${index === 0 ? 'selected' : ''}`}>
                            <label>{cam.name}</label>
                            <CustomButton icon={<SvgIcon name='delete' width={16} height={16} />} variant='outlined' />
                        </RippleEffect>
                    ))
                }

            </ul>
        </section>
    );
}

export default CameraList;