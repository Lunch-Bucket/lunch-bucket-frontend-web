import React, {useState, useEffect} from "react";
import "./User.css";
import "../../common/styles/CommonStyles.css"
import strings from '../../common/strings/strings';
import SearchBar from "../../components/SearchBar";
import { getUserData, userAddToThreat, userRemoveFromThreat } from "../../services/userService";
import withTokenExpirationCheck from "../../tokenExpirationCheck/withTokenExpirationCheck";
import Popup from "../../components/Popup";



function User() {

    const [user, setUser] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState('');
    const [popupMessage, setPopupMessage] = useState('');
    const [selectedUserLevelFilter, setSelectedUserLevelFilter] = useState('all');

    const [navOnline,setNavOnline] = useState(true)

    const openPopup = (type, message) => {
        setPopupType(type);
        setPopupMessage(message);
        setShowPopup(true);
      };

    async function fetchUserData() {
        try {
            const userData  = await getUserData([]);
            const filteredUsers = filterByUserLevel(userData, selectedUserLevelFilter);
            setUser(filteredUsers);

        } catch (error) {
            console.log("Error fetching user data:", error.message);
        }
    }

    const filterByUserLevel = (userData, userLevelFilter) => {
        switch(userLevelFilter){
            case 'all':
                return userData;
            case 'true':
                return userData.filter((user) => user.threat_state === true);
            case 'false':
                return userData.filter((user) => user.threat_state === false);
        }
       
      };
    
      const handleUserLevelFilterChange = (event) => {
        setSelectedUserLevelFilter(event.target.value);
      };

      
      useEffect(() => {
        if(navigator.onLine){
            setNavOnline(true);
        }else{
            setNavOnline(false);
        }
    }, [navigator.onLine]);

    useEffect(() => {
        if(navOnline)
            fetchUserData();
    }, [selectedUserLevelFilter]);


    const addToThreatFunc = async (user_id) =>{
        try{
            const response = await userAddToThreat(user_id);
            openPopup('error', 'Added the User to Threat');
            fetchUserData();
            console.log(response);
        }catch (error) {
            console.log('Error:', error);
            openPopup('error', 'Error Occured! Please retry.')
        }   
    }

    const RemoveFromThreatFunc = async (user_id) =>{
        try{
            const response = await userRemoveFromThreat(user_id);
            openPopup('success', 'Removed the User from Threat');
            fetchUserData();
            console.log(response);
        }catch (error) {
            console.log('Error:', error);
            openPopup('error', 'Error Occured! Please retry.')
        }   
    }

    return (
        <div className="full-container">
            {navOnline === false && <p style={{ color: 'red', textAlign: 'center' }}>Please Check Your Network Connection</p>}
            <div className="title-search-content">
              <h1 className="menu-title-text">{strings.user}</h1> 
              <div style={{display:'inline-flex'}}>
              <div style={{marginLeft:'2rem', fontWeight:'bold'}}>Filter By User Level</div>
                    <select style={{marginLeft:'1rem'}}
                    id="userLevelFilter"
                    value={selectedUserLevelFilter}
                    onChange={handleUserLevelFilterChange}>
                        <option value='all'>ALL</option>
                        <option value='true'>Threat </option>
                        <option value='false'>Not-Threat </option>
                    </select>
                </div>
              {/* <SearchBar/> */}
            </div>
            <hr/>
            <div>
                <table className="detail-table">
                    <thead className="user-page-table-row">
                        <th className="user-page-data-row">Customer Code</th>
                        <th className="user-page-data-row">Contact Number</th>
                        <th className="user-page-data-row">Ordered Packets</th>
                        <th className="user-page-data-row">Returned Packets</th>
                        <th className="user-page-data-row">Earned Points</th>
                        <th className="user-page-data-row" >User Level</th>
                    </thead>
                <tbody>
                    {user.map((dataList, id) => (
                        <tr className="user-page-table-row" >
                            <td className="user-page-data-row" style={{fontWeight:'bold'}}>{dataList.code}</td>
                            <td className="user-page-data-row">{dataList.contact_no}</td>
                            <td className="user-page-data-row" >{dataList.total_packets}</td>
                            <td className="user-page-data-row" >{dataList.balance_packets}</td>
                            <td className="user-page-data-row">{dataList.points.toFixed(2)}</td>
                            <td className="user-page-data-row" >
                            { dataList.threat_state === true && <button className="user-page-data-row-data-level-btn" 
                                onClick={()=>RemoveFromThreatFunc(dataList.customer_id)}>Remove Threat</button>}
                            { dataList.threat_state === false &&   <button className="user-page-data-row-data-level-btn level-down" 
                                onClick={()=>addToThreatFunc(dataList.customer_id)}>Make Threat</button>}
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
            {showPopup && (
              <Popup type={popupType} message={popupMessage} onClose={() => setShowPopup(false)} />
            )}
        </div>
    );
}

export default withTokenExpirationCheck(User);