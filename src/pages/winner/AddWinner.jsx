import React from "react";
import { useState } from "react";
import "./WinnerStyles.css";
import TopBar from "../../component/TopBar";

export default function Winner()
{

    const[userID, setUserID] = useState("");
    const[itemCount, setItemCount] = useState("");
    const[winningItem, setWinningItem] = useState("");
    const[coverImage, setCoverImage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The user ID you entered was: ${userID}`)
      }

    return(
            <div className="full-container">
                <TopBar
                    title ="Add Winner"
                />
                <div className="detail-container">
                   <form>
                    <table>
                        <tr>
                            <td><label className="form-label">User ID</label></td>
                            <td>  
                                <input className="form-input" type='text'   
                                value={userID}
                                onChange={(e) => setUserID(e.target.value)}/>
                            </td>  
                        </tr>
                        <tr>
                            <td> <label className="form-label" htmlFor="">Number of Items</label></td> 
                            <td>  
                                <input className="form-input" type='text'   
                                value={itemCount}
                                onChange={(e) => setItemCount(e.target.value)}/>
                            </td>   
                        </tr>
                        <tr>
                            <td> <label className="form-label" htmlFor="">Winning Item</label></td>
                            <td>  
                                <input className="form-input" type='text'   
                                value={winningItem}
                                onChange={(e) => setWinningItem(e.target.value)}/>
                            </td>  
                        </tr>
                        <tr>
                            <td> <label className="form-label" htmlFor="">Cover Image</label></td>
                            <td className="form-input-file-background"> <input className="form-input-file" type='file'/></td>  
                        </tr>
                    </table> 
                    <button className="btn" type="submit" onSubmit={handleSubmit}>Submit</button>    
                   </form>
                </div>
            </div>
    );
}