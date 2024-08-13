import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { setUser } from "../../sdk/redux/slices/userSlice";
import userService from "../../sdk/services/userService";
import CustomButton from "../../components/CustomButton/CustomButtonComponent";
import './LoginPage.scss';
import SvgIcon from "../../components/SvgIcons/SvgIconComponent";
import footerImg from "../../assets/svgs/login-footer-logo.svg";


const LoginPage: React.FC = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const dispatch = useDispatch();
    // const dummyUserStore = () => {
    //     dispatch(setUser({
    //         firstName: 'Hemanth',
    //         lastName: 'Kumar',
    //         email: 'hemanthkumarmk19@gmail.com',
    //         phoneNumber: '+91 9741163543',
    //         username: 'hemanth'
    //     }))
    // }

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Use login function from AuthContext
        login(username, password);
    }

    userService.getUsers().then((data: any) => {
        console.log('getUsers :: ', data);
    }).catch((e: any) => {
        console.log('getUsers:: ', e);
    })

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

                    <article className="input-and-label">
                        <label>Your email</label>

                        <div className="input-box">
                            <input
                                className="inputBox"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <figure className="icon">
                                <SvgIcon name="at" width={16} height={16} />
                            </figure>
                        </div>
                    </article>

                    <article className="input-and-label">
                        <label>Password</label>

                        <div className="input-box">
                            <input
                                className="inputBox"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <figure className="icon">
                                <SvgIcon name="lock" height={16} />
                            </figure>
                        </div>
                    </article>

                    <CustomButton
                        className="submit-btn"
                        text="Login"
                        type="submit"
                    />

                    {/* <button className='button' type="submit">Login</button> */}
                </div>

            </form>

            <footer className="login-footer-img">
                <img src={footerImg} alt="" />
            </footer>

        </section >
    );
}

export default LoginPage;