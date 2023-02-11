import "./Sidebar.scss";
const Sidebar = () => {
    
   
    return (
      <div className="SideBar">
        <div className="top">
         
            <span className="logo">Lunch Bucket</span>
          
        </div>
        <hr />
        <div className="center">
        <ul>
            <p className="title">Orders</p>
            <p className="title">Menu</p>
            <p className="title">Users</p>
            <p className="title">Promotions</p>
            <p className="title">Daily Winner</p>
            <p className="title">feed backs</p>
        </ul>
        </div>
        
      </div>
    );
  };
  
  export default Sidebar;