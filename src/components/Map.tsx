import React from "react";
import {useSelector} from "react-redux";
import {countryType} from "../bll/mapReducer";
import {Placemark, YMaps, Map} from "react-yandex-maps";
import elips from '.././img/elips.svg';
import {AppRootStateType} from "../bll/store";


export const YandexMap = () => {
    const activeCountry = useSelector<AppRootStateType, countryType>(country => country.state.filter(ct => ct.activeCountry)[0])

    return (
        <YMaps >
            <div className={"wrapper_map"}>
                <Map  className={"YMap"} defaultState={{center: activeCountry.mainCoordinates, zoom: activeCountry.zoom}}>{/* 1)проблема с переререндором*/}
                    {/*                                <Clusterer
                                    options={{
                                        groupByCoordinates: false,
                                        clusterIcons: [
                                            {
                                                size: [40, 40],
                                                offset: [-20, -20],
                                                href: elips
                                            }
                                        ],
                                    }}
                                ><<<< 2)неработает перерисовка в Ymaps Кластеров пытался и принудительно перерендерить через роуты, через кнопку*/}
                    {activeCountry.city.map((coun) => coun.office.map((of) => {
                        return <Placemark style={{height: 1000}} geometry={of.officeCoordinates}
                                          options={
                                              {
                                                  iconLayout: 'default#image',
                                                  iconImageHref: elips,
                                                  iconImageSize: [30, 40],
                                                  iconImageOffset: [-15, -10],
                                                  hideIconOnBalloonOpen: false
                                              }
                                          }
                                          properties={
                                              {
                                                  balloonContentBody: [
                                                      `<div class="baloon-content">
                                                <h2 class="baloon-header">${of.officeName}</h2>
                                                <p class="baloon-paragraph">${of.managerName}</p>
                                                <p class="baloon-paragraph">${of.tel}</p>
                                                <a class="baloon-email" href=${of.email}>${of.email}</a>
                                            </div>`,
                                                  ].join("")
                                              }}
                                          modules={['geoObject.addon.balloon']}

                        />
                    }))}
                    {/*</Clusterer>*/}
                </Map>
            </div>
        </YMaps>)
}
