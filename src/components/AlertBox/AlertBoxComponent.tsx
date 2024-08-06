import CustomButton from '../CustomButton/CustomButtonComponent';
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
                        icon="call"
                        variant="contained"
                        btnType='success'
                        sx={{ height: '28px', width: '28px' }}
                    />
                    <CustomButton
                        icon="close"
                        variant="contained"
                        btnType='error'
                        sx={{ height: '28px', width: '28px' }}
                    />
                </div>

                {
                    showViewDetailsBtn ? (
                        <aside className="right-actions">
                            <CustomButton
                                text="View details"
                                variant="contained"
                                sx={{ height: '28px', fontSize: '1.2rem' }}
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