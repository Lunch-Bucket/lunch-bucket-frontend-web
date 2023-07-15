import "./Sidebar.css";
import "@fontsource/poppins";
import {Link, NavLink} from "react-router-dom";
import PATHS from "../../common/paths/paths";
import logo from '../../resources/images/LunchBucket_Logo.png'

const Sidebar = () => {
    return (
        <div className="sidebar-container">
            <div className="sidebar-logo-container">
                <span className="sidebar-logo">
                    <Link to={PATHS.login}>
                        <img src={logo} style={{height:'8rem', width:'8rem'}} />
                    </Link>
                </span>
            </div>
            <div className="side-bar-page-list">
                <p className="side-bar-page-list-item"><NavLink to={PATHS.order}>Lunch Orders</NavLink></p>
                <p className="side-bar-page-list-item"><NavLink to={PATHS.orderDinner}>Dinner Orders</NavLink></p>
                <p className="side-bar-page-list-item"><NavLink to={PATHS.menu}>Menu</NavLink></p>
                <p className="side-bar-page-list-item"><NavLink to={PATHS.user}>Users</NavLink></p>
                <p className="side-bar-page-list-item"><NavLink to={PATHS.chat}>Chats</NavLink></p>

                {/* <p className="side-bar-page-list-item" style={{marginTop:'4rem'}}><NavLink to={PATHS.dashboard}>Dashboard</NavLink></p>
                <p className="side-bar-page-list-item"><NavLink to={PATHS.promotion}>Promotions</NavLink></p>
                <p className="side-bar-page-list-item"><NavLink to={PATHS.winner}>DailyWinner</NavLink></p>
                <p className="side-bar-page-list-item"><NavLink to={PATHS.feedback}>Feedbacks</NavLink></p> */}
            </div>
        </div>
    );
};

export default Sidebar;