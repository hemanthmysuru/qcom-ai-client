import SvgIcon from "../SvgIcons/SvgIconComponent";
import "./PinComponent.scss";

interface IPinProps {
    text: string;
}

const Pin: React.FC<IPinProps> = ({ text }) => {

    return (
        <figure className="pin">
            <SvgIcon name="pin" width={56} />
            <figcaption>{text}</figcaption>
        </figure>
    );
}
export default Pin;