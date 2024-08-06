import SvgIcon from '../SvgIcons/SvgIconComponent';
import './AppFooterComponent.scss';

const AppFooter: React.FC = () => {

    return (
        <footer className="app-footer">
            <SvgIcon name='footerLogo' />
        </footer>
    );
}

export default AppFooter;