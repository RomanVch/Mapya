import React from "react";
import {useDispatch} from "react-redux";
import {changeActiveCountryAC} from "../bll/mapReducer";

type changeButtonPropsType={
    activeCountry:boolean,
    country:string
    id:number
}
export const ChangeButton=(props:changeButtonPropsType)=>{
    const activeButton=props.activeCountry?"main__button--active":""
    const dispatch=useDispatch()
    const OnButtonChangeActive=()=>{
dispatch(changeActiveCountryAC(props.id))
    }
    return(
        <button  className={"main__button" +" " + activeButton}   onClick={OnButtonChangeActive}>{props.country} </button>
)}
