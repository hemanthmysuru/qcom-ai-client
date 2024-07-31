import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButtonComponent";
import CustomDialog from "../../components/CustomDialog/CustomDialogComponent";
import { useAuth } from "../../context/AuthContext";
import { setUser } from "../../sdk/redux/slices/userSlice";
import './LoginPage.scss';
import AlertBox from "../../components/AlertBox/AlertBoxComponent";
import { Notifications } from "@mui/icons-material";
import EventCountBar, { IEventCounter } from "../../components/EventCountBar/EventCountBarComponent";
import userService from "../../sdk/services/userService";
import ExpandableList from "../../components/ExpandableList/ExpandableList";
import ExpandableAlertList from "../../components/ExpandableAlertList/ExpandableAlertList";

const eventCounterList: IEventCounter[] = [
    { count: 54, icon: 'gpp_good', name: 'Safety Infraction' },
    { count: 10, icon: 'engineering', name: 'PPE - No hard hat' },
    { count: 54, icon: 'bed', name: 'PPE - No safty vest' },
    { count: 54, icon: 'settings', name: 'PPE - No mask' },
    { count: 9, icon: 'delete', name: 'Fall detection' },
    { count: 188, icon: 'home', name: 'Proximity to run equipment' },
];

const Expandableitems = [
    { id: 1, title: 'Item 1', content: <Notifications /> },
    { id: 2, title: 'Item 2', content: (<div><h4>Content for Item 2</h4><p>This content includes some static text and styles.</p></div>) },
    { id: 3, title: 'Item 3', content: (<div><button onClick={() => alert('Button Clicked!')}>Click Me</button></div>) },
    { id: 4, title: 'Item 4', content: (<div><button onClick={() => alert('Button Clicked!')}>Click Me</button></div>) },
];

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

    const dispatch = useDispatch();
    const dummyUserStore = () => {
        dispatch(setUser({
            firstName: 'Hemanth',
            lastName: 'Kumar',
            email: 'hemanthkumarmk19@gmail.com',
            phoneNumber: '+91 9741163543',
            username: 'hemanth'
        }))
    }

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Use login function from AuthContext
        login(username, password);
        // Navigate to home page or admin page based on user role
        if (username === 'admin' && password === 'admin') {
            dummyUserStore();
            navigate('/alerts'); // Redirect to admin page if admin
        } else {
            navigate('/'); // Redirect to home page if user
        }
    }

    userService.getUsers().then((data: any) => {
        console.log('getUsers :: ', data);
    }).catch((e: any) => {
        console.log('getUsers:: ', e);
    })

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

                {/* <div style={{ width: '320px' }}>
                    <ExpandableAlertList items={Expandableitems} />
                </div> */}

                <div style={{ width: '320px' }}>
                    <ExpandableList items={Expandableitems} />
                </div>

                <span>
                    <br />
                    <br />
                </span>
                <EventCountBar countList={eventCounterList} />
                <span>
                    <br />
                    <br />
                </span>

                <div style={{ width: '284px' }}>

                    {/* <AlertBox
                        headerLabel="Unattended"
                        subHeaderLabel="Production zone"
                        subHeaderIcon={<Notifications />}
                        footerLabel="Cam ID - #2"
                        timestamp="07-22-2024 | 12:09 AM"
                        showActionSection={true}
                        showViewDetailsBtn={true}
                        thumbnails={
                            {
                                image: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
                                video: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg'
                            }
                        } /> */}
                </div>

                <span>
                    <br />
                    <br />
                </span>

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