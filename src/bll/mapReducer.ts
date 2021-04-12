

const initialState = require("./../startState/startState.json")
type officeType = {
    "officeName": string,
    "managerName": string,
    "tel": string,
    "email": string,
    "officeCoordinates": number[],
    "idOffice": number,
    "activeOffice": boolean
}
type cityType = {
    "city": string,
    "cityCoordinates": number[],
    "idCity": number,
    "activeCity": boolean,
    "office": officeType[]
}
export type countryType = {
    "country": string,
    "mainCoordinates": number[],
    "zoom": number,
    "idCountry": number,
    "activeCountry": boolean,
    "city": cityType[]
}
export type initialStateType = countryType[]

type allAcType=changeActiveCountryACType|changeActiveOfficeACType

export const mapReducer = (state: initialStateType = initialState, action: allAcType): initialStateType => {
    switch (action.type) {
        case 'CHANGE_ACTIVE_COUNTRY': {
            const newState = [...state]
            newState.forEach((cl) => {
                cl.idCountry === action.idCountry ? cl.activeCountry = true : cl.activeCountry = false
            })

            return newState
        }
        case "CHANGE_ACTIVE_OFFICE": {

            const newState = [...state]
        newState.forEach(ct=>{
         ct.city.forEach((city)=>{
             if(city.idCity===action.idCity){
                 debugger
                 city.activeCity?city.activeCity=false:city.activeCity=true
             }else{
                 city.activeCity=false
             }
         })
        })
            return newState
        }
        default:
            return state;
    }
}
export const changeActiveCountryAC = (idCountry: number) => ({type: "CHANGE_ACTIVE_COUNTRY", idCountry} as const)
export type changeActiveCountryACType = ReturnType<typeof changeActiveCountryAC>

export const changeActiveOfficeAC = (idCity: number) => ({type: "CHANGE_ACTIVE_OFFICE", idCity} as const)
export type changeActiveOfficeACType = ReturnType<typeof changeActiveOfficeAC>
