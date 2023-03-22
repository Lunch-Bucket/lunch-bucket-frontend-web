import "./Sidebar.css";
import "@fontsource/poppins";
import {Link, NavLink} from "react-router-dom";
import PATHS from "../../common/paths/paths";

const Sidebar = () => {
    return (
        <div className="sidebar-styles">
            <div className="top">
                <span className="logo">
                    <Link to={PATHS.dashboard}>LunchBucket</Link>
                </span>
            </div>
            <div className="center">
                <p className="title"><NavLink to={PATHS.order}>Orders</NavLink></p>
                <p className="title"><NavLink to={PATHS.menu}>Menu</NavLink></p>
                <p className="title"><NavLink to={PATHS.user}>Users</NavLink></p>
                <p className="title"><NavLink to={PATHS.promotion}>Promotions</NavLink></p>
                <p className="title"><NavLink to={PATHS.winner}>Daily Winner</NavLink></p>
                <p className="title"><NavLink to={PATHS.feedback}>Feedbacks</NavLink></p>
                <p className="title"><NavLink to={PATHS.chat}>Chats</NavLink></p>
            </div>
        </div>
    );
};

export default Sidebar;