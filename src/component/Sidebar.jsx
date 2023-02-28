import "./Sidebar.scss";
import "@fontsource/poppins"; 
const Sidebar = () => {
    
   
    return (
      <div className="SideBar">
        <div className="top">
         
            <span className="logo">LunchBucket</span>
          
        </div>
       
        <div className="center">
        <ul>
            <p className="title">Orders</p>
            <p className="title">Menu</p>
            <p className="title">Users</p>
            <p className="title">Promotions</p>
            <p className="title">Daily Winner</p>
            <p className="title">Feedbacks</p>
            <p className="title">Chats</p>
        </ul>
        </div>
        
      </div>
    );
  };
  
  export default Sidebar;