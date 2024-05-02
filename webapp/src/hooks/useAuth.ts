import { User } from "features/auth/authApi";
import { selectCurrentUser } from "features/auth/authSlice";
import { useMemo } from "react";
import { useSelector } from "react-redux";

function useAuth(){
    const user:User | null =  useSelector(selectCurrentUser)
    
    const setItemToStore = (key:string, payload:any, store = localStorage) =>{
        store.setItem(key, payload);
    }
    const setObjectItemToStore = (key:string, payload:any,objectName:string, store = localStorage) => {
        let newObject = JSON.parse(localStorage.getItem(objectName) || "{}")
        newObject[key] = payload
        localStorage.removeItem(objectName)        
        localStorage.setItem(objectName,JSON.stringify(newObject))        
    }
    let isVendor = false
    let isCustomer = false
    if (user){
        isCustomer = user.role == 'CUSTOMER' ? true:false
        isVendor = user.role == 'VENDOR' ? true:false        
    }
    return useMemo(()=>(
        {user , isCustomer, isVendor,setObjectItemToStore}
    ),[user])
}

export default useAuth;