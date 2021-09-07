import React,{useState} from 'react';
import "../styles/Navbar.css";
import {ZodaicJsonArray} from "../Constants/ZodaicTable";
import { FaTimes } from "react-icons/fa";




function PopUps({bPopUpShow,setbPopUpShow}) {
    return (
        <div className="PopUpcls">
            <div className="PopUPX">
            <span className="spoplbl">Find your Zodaic sign and planet from below table.</span>
            <button type="button" className="popbtnsubmit" onClick={()=>{setbPopUpShow(false);bPopUpShow=false;}}><FaTimes></FaTimes></button>
            </div>
            <table id="customers">
                <tr>{renderTableHeaders()}</tr>
                {renderTableColumns()}
            </table>
        </div>
    );

    function renderTableHeaders()
    {
        return ["ZODAIC SIGN","DOB RANGE","PLANET"].map((param,index)=>{

           return <th key={index}>{param}</th>
        })
    }
    function renderTableColumns()
    {
      return ZodaicJsonArray.map((ObjParam,index)=>{
       return <tr key={index}>
              <td>{ObjParam.SignName}</td>
              <td>{ObjParam.PeriodOfBirth}</td>
              <td>{ObjParam.PlanetName}</td>
              </tr>

      })
    }
}

export default PopUps;
