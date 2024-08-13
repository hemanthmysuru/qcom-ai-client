import React from 'react';
import './App.scss';
import AppRoutes from './routes/AppRoutes';
import { useDispatch } from 'react-redux';
import { setUser } from './sdk/redux/slices/userSlice';

interface IProps {
    appConfig?: any;
    userConfig?: any;
}
const App: React.FC<IProps> = ({ appConfig, userConfig }) => {
    console.log('AppConfig:: ', appConfig);
    console.log('UserConfig:: ', userConfig);

    // const dispatch = useDispatch();
    // dispatch(setUser({
    //     firstName: 'Hemanth',
    //     lastName: 'Kumar',
    //     email: 'hemanthkumarmk19@gmail.com',
    //     phoneNumber: '+91 9741163543',
    //     username: 'hemanth',
    //     designation: 'Ops Manager'
    // }))

    return (
        <AppRoutes />
    );
}

export default App;
