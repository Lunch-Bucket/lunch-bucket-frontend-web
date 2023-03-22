import React from "react";
import {BsPlusCircleFill} from "react-icons/bs";


export default function HeaderButton({text}) {
    return (
        <div>
            <button className="button-container">
                <BsPlusCircleFill size={20}/>
                {text}
            </button>
        </div>
    );
}