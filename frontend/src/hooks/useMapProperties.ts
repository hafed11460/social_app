import { useGetCitiesQuery } from "features/core/tools"
import { useGetPropertiesFilterMutation, useGetPropertiesQuery } from "features/properties/propertyAPI"
import { Dispatch, createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react"
import { ICity, IProperty, IPaginationLinks, IPosition } from "types/properties"

export const SET_PROPERTIES  = "SET_PROPERTIES"
export const SET_CITIES  = "SET_CITIES"
export const SET_CITY_ID  = "SET_CITY_ID"
export const SET_POSITION  = "SET_POSITION"
export const SET_SEARCH  = "SET_SEARCH"
export const SET_PROPERTY_ID  = "SET_PROPERTY_ID"
export const SET_QUERY_PARAMS  = "SET_QUERY_PARAMS"
export const SET_PAGE_LINKS = "SET_PAGE_LINKS"
export const PUSH_PROPERTIES = "PUSH_PROPERTIES"

type ActionType = 
    | {type:"SET_PROPERTIES",payload:IProperty[]}
    | {type:"SET_CITIES",payload:ICity[]}
    | {type:"SET_CITY_ID",payload:number}
    | {type:"SET_POSITION",payload:IPosition}
    | {type:"SET_SEARCH",payload:string}
    | {type:"SET_PROPERTY_ID",payload:number}
    | {type:"SET_QUERY_PARAMS",payload:string}
    | {type:"SET_PAGE_LINKS",payload:IPaginationLinks}
    | {type:"PUSH_PROPERTIES",payload:IProperty[]}


type PropertiesContextType = {
    properties: IProperty[],
    cities?: ICity[],
    search?: string
    city_id?: number,
    propertyID?: number | null,
    position:IPosition,
    queryParams?: string,
    links?: IPaginationLinks,
    // dispatch:Dispatch<ActionType>
    // setCityId?:(city_id:number )=>void,
    // setPosition:(position:IPosition )=>void,
    // setPropertyID:(property_id:number | null )=>void,
    // setQueryParams:(query:string)=>void
    // getPropertiesFilter:(query:string)=>void
}
type PropertiesDispatchContextType = {
    dispatch:Dispatch<ActionType>   
    setCityId?:(city_id:number )=>void,
    setPosition:(position:IPosition )=>void,
    setPropertyID:(property_id:number | null )=>void,
    setQueryParams:(query:string)=>void
    getPropertiesFilter:(query:string)=>void
}

const initState:PropertiesContextType = {
    // dispatch: () => { },
    properties: [],
    cities: [],
    search: '',
    city_id:0,
    position:{lat:36.72440903333444,lng:3.08104183285631},
    queryParams: '',
    // setCityId:(city_id:number)=>{},
    // setPropertyID:(property_id:number | null)=>{},
    // // city: null,
    // // propertyID: null,
    // // position: [latitude, longitude],
    // // links: null
    // setQueryParams:(query:string)=>{},
    // getPropertiesFilter:(query:string)=>{},
    // setPosition:(position:IPosition )=>{}
}


export const PropertiesContext = createContext<PropertiesContextType>({} as PropertiesContextType)
export const PropertiesDispatchContext = createContext<PropertiesDispatchContextType>({} as PropertiesDispatchContextType)

export function usePropertiesSourcess() {
    const { data, isLoading, isError } = useGetPropertiesQuery({})
    const [getPropertiesFilter, { data: filterData }] = useGetPropertiesFilterMutation()
    const { data: citiesData } = useGetCitiesQuery({})

   
    const [{
        properties,
        search,
        city_id,
        cities,
        position,
        propertyID,
        queryParams,
        links
    }, dispatch] = useReducer((state:any, action:ActionType) => {
        const { type, payload } = action
        switch (type) {
            case SET_PROPERTIES: {
                // console.log(SET_PROPERTIES,payload)
                return { ...state, properties: payload }
            }
            case PUSH_PROPERTIES: {
                let arr = [...state.properties, payload]            
                return { ...state, properties: arr }
            }

            case SET_CITIES:
                return { ...state, cities: payload }

            case SET_SEARCH:
                return { ...state, search: payload }

            case SET_CITY_ID:
                return { ...state, city_id: payload }

            case SET_PROPERTY_ID:
                return { ...state, propertyID: payload }

            case SET_POSITION:
                return { ...state, position: payload }

            case SET_QUERY_PARAMS:
                return { ...state, queryParams: payload }

            case SET_PAGE_LINKS:
                return { ...state, links: payload }
        }
    }, initState)

    useEffect(() => {
        if (filterData) {
            console.log(filterData)
            dispatch({
                type: SET_PROPERTIES,
                payload: filterData.results
            })
            dispatch({
                type: SET_PAGE_LINKS,
                payload: filterData.links
            })
        }
    }, [filterData])

    useEffect(()=>{

    },[city_id])


    useEffect(() => {
        if (data) {
            dispatch({
                type: SET_PROPERTIES,
                payload: data.results
            })
            dispatch({
                type: SET_PAGE_LINKS,
                payload: data.links
            })
        }        
    }, [data])

    useEffect(() => {
        if (citiesData) {
            dispatch({
                type: SET_CITIES,
                payload: citiesData
            })
        }         
    }, [citiesData])



    const filterProperties = useMemo(() => {
        // console.log('befor filterProperties', properties)
        if (city_id == 0) return properties;

        return properties.filter((p:IProperty) => {
            if (!p.city) return;
            return p?.city?.id === city_id
        })
    }, [properties,city_id])



    const citySelected = useMemo(() => {
        return cities.filter((c:ICity) => c.id == city_id)
    }, [cities, city_id])


    const sortedProperties = useMemo(() =>
        [...filterProperties].sort((a, b) => 
            a.title > b.title ? 1 : -1
        ),[filterProperties]
    )

    const setSearch = (search:string) => {
        // console.log(SET_SEARCH)
        dispatch({
            type: SET_SEARCH,
            payload: search
        })
    }

    const setPosition = useCallback((position:IPosition) => {
        // console.log(SET_POSITION)
        dispatch({
            type: SET_POSITION,
            payload: position
        })
    },[dispatch])

    const setQueryParams = (params:string) => {
        // console.log('setQueryParams', params)
        dispatch({
            type: SET_QUERY_PARAMS,
            payload: params
        })
    }

    const setPropertyID = (propertyID:number) => {
        dispatch({
            type: SET_PROPERTY_ID,
            payload: propertyID
        })
    }

    const setCityId = (city_id:number) => {
        // console.log('set_city_id')
        if (city_id == 0) {
            dispatch({
                type: SET_CITY_ID,
                payload: city_id
            })
            return;
        };
        const cityS:ICity[] = cities.filter((c:ICity) => c.id == city_id)
        if (cityS.length > 0) {
            const newPosition:IPosition = {lat:cityS[0].lat, lng:cityS[0].lng}
            dispatch({
                type: SET_CITY_ID,
                payload: city_id
            })
            dispatch({
                type: SET_POSITION,
                payload: newPosition
            })
        }
    }

    return {
        // properties,
        dispatch,
        properties: sortedProperties,
        search, setSearch,
        city_id, setCityId,
        cities,
        citySelected: citySelected,
        position, setPosition,
        propertyID, setPropertyID,
        queryParams, setQueryParams,
        getPropertiesFilter,
        links
    }
}

// export function useMapProperties() {
//     return useContext(PropertiesContext)
// }
// export function useMapPropertiesDispatch(){
//     return useContext(PropertiesDispatchContext)
// }