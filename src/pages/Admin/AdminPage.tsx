import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../sdk/redux/store/store';

const AdminPage: React.FC = () => {

    const user = useSelector((state: RootState) => state.user.user);

    return (
        <section>
            <h3>Admin Page</h3>
            {user ? (
                <ul>
                    <li>{user?.firstName}</li>
                    <li>{user?.lastName}</li>
                    <li>{user?.emailId}</li>
                </ul>
            ) : <></>}
        </section>
    );
};

export default AdminPage;
