import React from "react";
import { useState } from "react";
import "../winner/WinnerStyles.css";
import TopBar from "../../component/TopBar";

export default function AddPromotion()
{

    const[name, setName] = useState("");
    const[validFromDate, setValidFromDate] = useState("");
    const[validToDate, setValidToDate] = useState("");
    const[description, setDescription] = useState("");
    const[coverImage, setCoverImage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The user ID you entered was: ${name}`)
      }

    return(
            <div className="full-container">
                <TopBar
                    title ="Add Promotions"
                />
                <div className="detail-container">
                   <form>
                    <table>
                        <tr>
                            <td><label className="form-label">Name</label></td>
                            <td>  
                                <input className="form-input" type='text'   
                                value={name}
                                onChange={(e) => setName(e.target.value)}/>
                            </td>  
                        </tr>
                        <tr>
                            <td> <label className="form-label" htmlFor="">Valid Period</label></td> 
                            <td>  
                                <input className="form-input" type='date'   
                                value={validFromDate}
                                onChange={(e) => setValidFromDate(e.target.value)}/> to
                                <input className="form-input" type='date'   
                                value={validToDate}
                                onChange={(e) => setValidToDate(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td> <label className="form-label" htmlFor="">Desription</label></td>
                            <td>  
                                <textarea className="form-input" type='text'   
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}/>
                            </td>  
                        </tr>
                        <tr>
                            <td> <label className="form-label" htmlFor="">Cover Image</label></td>
                            <td className="form-input-file-background"> <input className="form-input-file" type='file'/></td>  
                        </tr>
                    </table> 
                    <button type="submit" onSubmit={handleSubmit}>Submit</button>    
                   </form>
                </div>
            </div>
    );
}