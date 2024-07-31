import Icon from '@mui/material/Icon';
import './EventCountBarComponent.scss';
import CustomButton from '../CustomButton/CustomButtonComponent';

export interface IEventCounter {
    icon: any;
    count: number;
    name: string;
}

interface IProps {
    countList: IEventCounter[];
}

const EventCountBar: React.FC<IProps> = ({ countList }) => {

    return (
        <ul className='even-counter-bar'>
            {
                countList.map((eventCount: IEventCounter, index: number) => (
                    <li key={index}>

                        <CustomButton
                            icon={eventCount.icon}
                            sx={{ width: '36px', height: '36px !important' }}
                        />
                        {/* <Icon>{eventCount.icon}</Icon> */}
                        <header>
                            <h4>{eventCount.count}</h4>
                            <h5>{eventCount.name}</h5>
                        </header>
                    </li>
                ))
            }

        </ul>
    );
}

export default EventCountBar;