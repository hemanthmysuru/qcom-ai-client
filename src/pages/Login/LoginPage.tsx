import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import footerImg from "../../assets/svgs/login-footer-logo.svg";
import SvgIcon from "../../components/SvgIcons/SvgIconComponent";
import { useAuth } from "../../context/AuthContext";
import './LoginPage.scss';
import CustomButton from "../../components/CustomButton/CustomButtonComponent";

const autoFeedLoginCreds = {
    emailId: 'admin@email.com',
    password: 'smart123'
}


const LoginPage: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const dispatch = useDispatch();


    // Auto-fill login credentials in development mode
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            setEmail(autoFeedLoginCreds.emailId);
            setPassword(autoFeedLoginCreds.password);
        }
    }, []);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const hashedPassword = hashPassword(password);
        const hashedPassword = password;
        try {
            await login(email, hashedPassword);
        } catch (error) {
            console.error('Login error:', error);
        }
    }

    // userService.getUsers().then((data: any) => {
    //     console.log('getUsers :: ', data);
    // }).catch((e: any) => {
    //     console.log('getUsers:: ', e);
    // })

    const renderInputBox = (labelName: string, inputType: 'text' | 'password', placeholderTxt: string, inputValue: string, iconName: 'at' | 'lock') => (
        <article className="input-and-label">
            <label>{labelName}</label>

            <div className="input-box">
                <input
                    className="inputBox"
                    type={inputType}
                    placeholder={placeholderTxt}
                    value={inputValue}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <figure className="icon">
                    <SvgIcon name={iconName} width={16} height={16} />
                </figure>
            </div>
        </article>
    );

    return (
        <section className="login-page">

            <form onSubmit={handleLogin}>
                <header>
                    <figure>
                        <SvgIcon name="logoAndName" height={32} />
                    </figure>
                    <label></label>
                </header>

                <div className="content">
                    {renderInputBox('Your email', 'text', 'Enter email id', email, 'at')}
                    {renderInputBox('Password', 'password', 'Enter password', email, 'lock')}
                    <CustomButton className="submit-btn" text="Login" type="submit" />
                </div>

            </form>

            <footer className="login-footer-img">
                <img src={footerImg} alt="" />
            </footer>

        </section >
    );
}

export default LoginPage;