import { RootState } from "app/store"
export const getItemFromStore = (key:string , defaultValue:any, store:Storage = localStorage) => {
    try {
      return JSON.parse(store.getItem(key) || "") || defaultValue;
    } catch {
      return (store.getItem(key) || "")  || defaultValue;
    }
  };


  export const getColor = (name:string, dom = document.body) => {
    return getComputedStyle(dom).getPropertyValue(`--net-${name}`).trim();
  };
