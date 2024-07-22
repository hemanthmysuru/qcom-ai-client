import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import './LoginPage.scss';
import { Notifications, BarChart, Settings } from '@mui/icons-material';
import { Button, IconButton } from "@mui/material";
import CustomButton from "../../components/CustomButton/CustomButtonComponent";
import CustomDialog from "../../components/CustomDialog/CustomDialogComponent";
// import AppButton from "../../components/Button/ButtonComponent";
// import { AppButton, AppIconButton } from "../../components/Button/ButtonComponent";
// import AppButton from "../../components/Button/ButtonComponent";

const LoginPage: React.FC = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCancel = () => {
        console.log('Cancelled');
        handleClose();
    };
    const handleSave = () => {
        console.log('Saved');
        handleClose();
    };


    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Use login function from AuthContext
        login(username, password);
        // Navigate to home page or admin page based on user role
        if (username === 'admin' && password === 'admin') {
            navigate('/admin'); // Redirect to admin page if admin
        } else {
            navigate('/'); // Redirect to home page if user
        }
    }

    return (
        <section className="login-page">
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <input
                    className="inputBox"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="inputBox"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='button' type="submit">Login</button>

                <div>
                    {/* <Button variant="contained" color="primary" onClick={handleOpen}>
                        Open Dialog
                    </Button> */}

                    <CustomButton
                        icon="settings" // Material-UI icon name
                    // contentDisplay='only-icon-or-text'
                    // type="iconOnly"
                    // onClick={() => console.log('Icon Only Button Clicked')}
                    />

                    <CustomButton
                        text="Open dialog"
                        icon="chair"
                        variant="contained"
                        iconPosition="start"
                        onClick={handleOpen}
                    />

                    <CustomDialog
                        open={open}
                        onClose={handleClose}
                        content={<div>Dynamic Content Goes Here</div>}
                        onCancel={handleCancel}
                        onSave={handleSave}
                        cancelText="Cancel"
                        saveText="Save"
                    />
                </div>

                {/* <div>
                <AppButton
                    icon={<Settings />}
                    text="Add"
                    variant="default"
                    color="blue"
                // onClick={() => alert('Button clicked!')}
                />
                <AppButton
                    text="Submit"
                    variant="transparent"
                    color="blue"
                // onClick={() => alert('Button clicked!')}
                />
                <AppButton
                    icon={<Notifications />}
                    variant="default"
                    color="blue"
                // disabled
                />
            </div> */}

                {/* <Button
                    className="button button-text blue"
                    startIcon={<Notifications />}
                    disabled
                >
                    Disabled Icon Button
                </Button> */}

                <CustomButton
                    text="Star"
                    icon="school"
                    iconPosition="start"
                />

                <CustomButton
                    icon="delete"
                    variant="outlined"
                />

                {/* <div style={{ padding: '20px', display: 'flex', gap: '10px' }}> */}
                {/* Contained button with only text */}
                <CustomButton
                    text="Contained"
                />

                {/* Outlined button with only text */}
                <CustomButton
                    text="Outlined"
                    variant="outlined"
                />

                {/* Contained button with only icon */}
                <CustomButton
                    icon="star"
                    variant="contained"
                />

                {/* Outlined button with only icon */}
                <CustomButton
                    icon="delete"
                    variant="outlined"
                />

                {/* Contained button with both text and icon */}
                <CustomButton
                    text="Star"
                    icon="star"
                    iconPosition="start"
                />

                {/* Outlined button with both text and icon */}
                <CustomButton
                    text="Star"
                    icon="chair"
                    variant="outlined"
                    iconPosition="start"
                />

                <CustomButton
                    text="Warning Button"
                    icon="warning"
                    variant="contained"  // You can use 'outlined' as well
                    type="warning"
                />

                <CustomButton
                    text="Success Button"
                    icon="check_circle"
                    variant="contained"  // You can use 'outlined' as well
                    type="success"
                />

                <CustomButton
                    text="Error Button"
                    icon="error"
                    variant="contained"  // You can use 'outlined' as well
                    type="error"
                />


                {/* </div> */}



                {/* <Button startIcon={<Settings />}>
                    Icon Button
                </Button>

                <IconButton >
                    <Notifications />
                </IconButton> */}

                {/* <button >
                <Notifications />
            </button> */}

                {/* <IconButton >
                    <Notifications />
                </IconButton>

                <IconButton disabled>
                    <BarChart />
                </IconButton> */}


            </form>


        </section >
    );
}

export default LoginPage;