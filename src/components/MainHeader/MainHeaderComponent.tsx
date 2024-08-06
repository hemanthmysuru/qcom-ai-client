import { NavLink } from "react-router-dom";
import './MainHeaderComponent.scss';
import SvgIcon from "../SvgIcons/SvgIconComponent";

const MainHeader: React.FC = () => {
    return (
        <header className="main-header">
            <figure className="logo">
                <SvgIcon name="logoAndName" height={32} width={222} />
            </figure>

            <section className="nav-and-user-info">
                <nav>
                    <NavLink to="/alerts" className={({ isActive }) => (isActive ? 'selected' : '')}>
                        <SvgIcon name="bell" height={14} />
                        <label>alerts</label>
                    </NavLink>
                    <NavLink to="/analytics" className={({ isActive }) => (isActive ? 'selected' : '')}>
                        <SvgIcon name="analytics" height={14} />
                        <label>Analytics</label>
                    </NavLink>
                    <NavLink to="/configurations" className={({ isActive }) => (isActive ? 'selected' : '')}>
                        <SvgIcon name="config" height={14} />
                        <label>Configurations</label>
                    </NavLink>
                </nav>

                <aside className="user-info">
                    <figure className="silhouette">H</figure>
                    {/* <header className="info">
                        <h3>Hemanth</h3>
                        <h5>Manager</h5>
                    </header> */}
                </aside>
            </section>

        </header>
    );
}

export default MainHeader;