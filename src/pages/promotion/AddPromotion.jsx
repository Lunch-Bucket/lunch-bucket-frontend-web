import React, {useState} from "react";
import "./AddPromotion.css";

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
                 <h2>Add New Promotion</h2>
                <hr/>
                <div className="nameSpace">
                    <p className="promoName">Promotion#010</p>
                   
                </div>
                <hr/>
                <div className="detail-container">
                   <form>
                       <table>
                           <thead></thead>
                           <tbody>
                           <tr>
                               <td><label className="form-label">Name</label></td>
                               <td>
                                   <input className="form-input" type='text'
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}/>
                               </td>
                           </tr>
                           <tr>
                               <td><label className="form-label" htmlFor="">Valid from</label></td>
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
                               <td><label className="form-label" htmlFor="">Desription</label></td>
                               <td>
                                <textarea className="form-input" type='text'
                                          value={description}
                                          onChange={(e) => setDescription(e.target.value)}/>
                               </td>
                           </tr>
                           <tr>
                               <td><label className="form-label" htmlFor="">Cover Image</label></td>
                               <td className="form-input-file-background"><input className="form-input-file"
                                                                                 type='file'/></td>
                           </tr>
                           </tbody>
                    </table> 
                    <button className="btn" type="submit" onSubmit={handleSubmit}>Submit</button>    
                   </form>
                </div>
            </div>
    );
}