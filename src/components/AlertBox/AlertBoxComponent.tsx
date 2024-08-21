import CustomButton from '../CustomButton/CustomButtonComponent';
import SvgIcon from '../SvgIcons/SvgIconComponent';
import './AlertBoxComponent.scss';

interface IProps {
    headerLabel: string;
    subHeaderLabel?: string;
    subHeaderIcon?: any;
    footerLabel?: string;
    timestamp?: string;
    thumbnails?: {
        video?: string;
        image?: string;
    };
    showActionSection?: boolean;
    showViewDetailsBtn?: boolean;
    onAlertViewDetailsClick: () => void;
}

const AlertBox: React.FC<IProps> = ({ headerLabel = '', subHeaderLabel = '', subHeaderIcon, footerLabel = '', timestamp = '', thumbnails, showActionSection = false, showViewDetailsBtn = false, onAlertViewDetailsClick }) => {

    const renderThumbnail = () => {
        return (
            (thumbnails?.video || thumbnails?.image) ?
                (
                    <aside className="thumbnails">
                        {
                            thumbnails?.image ? (
                                <figure>
                                    <img src={thumbnails?.image} alt="" />
                                </figure>
                            ) : ''
                        }
                        {
                            thumbnails?.video ? (
                                <figure className='play-icon'>
                                    <img src={thumbnails?.video} alt="" />
                                </figure>
                            ) : ''
                        }
                    </aside>
                ) : ''
        )
    }

    const renderActions = () => {
        return (
            <section className={`actions ${showActionSection ? 'show' : ''}`}>

                <div className="left-actions">
                    <CustomButton
                        variant="contained"
                        btnType='success'
                        icon={<SvgIcon name='reset' width={16} height={16} />}
                    />
                    <CustomButton
                        variant="contained"
                        btnType='error'
                        icon={<SvgIcon name='close' width={16} height={16} />}
                    />
                </div>

                {
                    showViewDetailsBtn ? (
                        <aside className="right-actions">
                            <CustomButton
                                text="View details"
                                variant="contained"
                                onClick={onAlertViewDetailsClick}
                            />
                        </aside>

                    ) : ''
                }


            </section>
        );
    }

    return (
        <section className="alert-box">

            <header className='alert-box__header'>
                <section className="main-and-subheader">
                    <h4 className="main-heading">{headerLabel}</h4>
                    <h6 className='sub-heading'>
                        {
                            subHeaderIcon ? subHeaderIcon : <></>
                        }
                        {subHeaderLabel}
                    </h6>
                </section>

                {renderThumbnail()}

            </header>

            {renderActions()}

            <hr />

            <footer>
                <label>{footerLabel}</label>
                <time>{timestamp}</time>
            </footer>
        </section>
    )
}

export default AlertBox;