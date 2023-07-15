import React, {useState, useEffect} from "react";
import "./User.css";
import "../../common/styles/CommonStyles.css"
import strings from '../../common/strings/strings';
import SearchBar from "../../components/SearchBar";
import { getUserData } from "../../services/userService";



export default function User() {

    const [showThreatBtn, setShowThreatBtn] = useState(true)
    const [currUser, setCurrUser] = useState("")
    const [user, setUser] = useState([]);

    async function fetchUserData() {
        try {
            const userData  = await getUserData([]);
            setUser(userData);
            console.log('user data in user page', user);

        } catch (error) {
            console.log("Error fetching user data:", error.message);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);


    function showThreat(value)
    {
    
        setCurrUser(value);   
    }

    return (
        <div className="full-container">
            <div className="title-search-content">
              <h1 className="menu-title-text">{strings.user}</h1> 
              <SearchBar/>
            </div>
            <hr/>
            <div>
                <table className="detail-table">
                <tbody>
                    {user.map((dataList, id) => (
                        <tr className="user-page-table-row" >
                            <td className="user-page-data-row" style={{minWidth:'35%'}}>{(dataList.customer_id)}</td>
                            <td className="user-page-data-row"  >{dataList.total_packets}</td>
                            <td className="user-page-data-row" >{dataList.balance_packets}</td>
                            <td className="user-page-data-row" >
                              {showThreatBtn && <button className="user-page-data-row-data-threat-btn" onClick={()=>showThreat(dataList.customer_id)}>Threat</button>}
                              {/* {(currUser == (dataList.customer_id) && !showThreatBtn) && <button className="user-page-data-row-data-threat-btn"  >Remove from Threat</button>} */}
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}