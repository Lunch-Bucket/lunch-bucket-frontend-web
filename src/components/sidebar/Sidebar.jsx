import "./Sidebar.css";
import "@fontsource/poppins";
import {Link, NavLink} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar-styles">
            <div className="top">
                <span className="logo">
                    <Link to="/">LunchBucket</Link>
                </span>
            </div>
            <div className="center">
                <p className="title"><NavLink to="/order">Orders</NavLink></p>
                <p className="title"><NavLink to="/menu">Menu</NavLink></p>
                <p className="title"><NavLink to="/user">Users</NavLink></p>
                <p className="title"><NavLink to="/promotion">Promotions</NavLink></p>
                <p className="title"><NavLink to="winner">Daily Winner</NavLink></p>
                <p className="title"><NavLink to="/feedback">Feedbacks</NavLink></p>
                <p className="title"><NavLink to="/chat">Chats</NavLink></p>
            </div>
        </div>
    );
};

export default Sidebar;