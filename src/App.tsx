import React from 'react';
import arrUp from './img/arrUp.svg';
import arrDown from './img/arrDown.svg';

import './App.scss';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./bll/store";
import {changeActiveOfficeAC, countryType, initialStateType} from "./bll/mapReducer";
import {ChangeButton} from "./components/ChangeButton";
import {YandexMap} from "./components/Map";

function App() {
    const state = useSelector<AppRootStateType, initialStateType>(state => state.state)
    const activeCountry = useSelector<AppRootStateType, countryType>(country => country.state.filter(ct => ct.activeCountry)[0])
    const dispatch = useDispatch()
    const onClickOpenCity = (cityId: number) => {
        dispatch(changeActiveOfficeAC(cityId))
    }
    return (
        <div className={"main"}>
            <div>
                    <div className={"buttonBlock"}>
                    {state.map((ct, i) => {
                        return <ChangeButton key={i} id={ct.idCountry} activeCountry={ct.activeCountry}
                                             country={ct.country}/>
                    })}</div>
                    <div className={"cityBlock"}>
                        {activeCountry.city.map((ct, i) => {
                            if (ct.activeCity) {
                                return <div key={i}>
                                    <div className={"mainCityHeader"} onClick={() => onClickOpenCity(ct.idCity)}>
                                        <h2 className={"city__name"}>{ct.city}</h2>
                                        <img className={"city__arrow"}
                                             src={arrUp}
                                             alt="вкл стрелка"/></div>
                                    {ct.office.map((of, i) => {
                                        return <div key={i}>
                                            <h3 className={"city__office"}>{of.officeName}</h3>
                                            <p className={"city__managerName"}>{of.managerName}</p>
                                            <p className={"city__tel"}>{of.tel}</p>
                                            <a className={"city__email"} href={of.email}>{of.email}</a>
                                        </div>
                                    })}
                                </div>
                            } else {
                                return <div className={"mainCityHeader"} onClick={() => onClickOpenCity(ct.idCity)}
                                            key={i}>
                                    <h2 className={"city__name"+" "+"city__name--no-active"}>{ct.city}</h2>

                                    <img className={"city__arrow"} src={arrDown}
                                         alt="выкл стрелка"/></div>
                            }
                        })}
                    </div>

            </div>
            <div>
                <YandexMap/>
            </div>
        </div>
    );
}

export default App;
