import React, {useState, useEffect} from "react";
import "./User.css";
import "../../common/styles/CommonStyles.css"
import strings from '../../common/strings/strings';
import SearchBar from "../../components/SearchBar";
import { getUserData } from "../../services/userService";



export default function User() {

    const [user, setUser] = useState([]);
    const [level, setLevel] = useState('');
    const [currUser, setCurruser] = useState('')

    async function fetchUserData() {
        try {
            const userData  = await getUserData([]);
            setUser(userData);
            setLevel(userData.level)

        } catch (error) {
            console.log("Error fetching user data:", error.message);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);


    function handleLevel(levelType, userID)
    {
        setCurruser(userID);
        if(levelType == 'up'){
            setLevel('up')
            alert("Successfully Leveled Up!")
        }
        else{
            setLevel('drop')
            alert("Dropped the Level!")
        }
 
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
                    <thead className="user-page-table-row">
                        <th className="user-page-data-row">Customer ID</th>
                        <th className="user-page-data-row">Ordered Packet Count</th>
                        <th className="user-page-data-row">Returned Packet Count</th>
                        <th className="user-page-data-row" style={{marginLeft:'5rem'}}>User Level</th>
                    </thead>
                <tbody>
                    {user.map((dataList, id) => (
                        <tr className="user-page-table-row" >
                            <td className="user-page-data-row" style={{minWidth:'35%'}}>{(dataList.customer_id)}</td>
                            <td className="user-page-data-row" >{dataList.total_packets}</td>
                            <td className="user-page-data-row" >{dataList.balance_packets}</td>
                            { dataList.level == 'neutral'&& <td className="user-page-data-row" >
                              <button className="user-page-data-row-data-level-btn" onClick={()=>handleLevel('up', dataList.customer_id)}>Up</button>
                              <button className="user-page-data-row-data-level-btn level-down" onClick={()=>handleLevel('drop', dataList.customer_id)}>Drop</button>
                            </td>}
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}