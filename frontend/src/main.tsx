import React, { Dispatch, FC, ReactNode, createContext, useReducer } from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import { getItemFromStore } from "helpers/utils"
import useToggleStylesheet from "hooks/useToggleStyle"

import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/compiled/css/app.css"
import "assets/global.css"
// import 'assets/base.css'


export interface RowSetting {
  matricule?: boolean,
  employee?: boolean,
  duree?: boolean,
  date_achat?: boolean,
  montant?: boolean,
  solde?: boolean,
}

export interface AppAction {
  type: string;
  payload: any
}

interface AppSettings {
  isOverflow: boolean;
  isDark: boolean,
  isSidebar: boolean,
  isHide: boolean,
  suFix?: boolean,
  config?: any,
  row?: RowSetting,
}

export const settings: AppSettings = {
  isOverflow: false,
  isDark: true,
  isSidebar: false,
  isHide: false,
  suFix: false,
  row: {
    matricule: true,
    employee: true,
    duree: true,
    date_achat: true,
    montant: true,
    solde: true,
  }
}


export interface IAppContext {
  config: AppSettings,
  dispatch: Dispatch<AppAction>,
  setConfig: (key: string, value: any) => void
}

export const AppContext = createContext<IAppContext>({
  config: settings,
  setConfig: (key: string, value: any) => { },
  dispatch: () => { }
})



export const configReducer = (state: AppSettings, action: AppAction) => {
  const { type, payload } = action;
  console.log(type, payload)
  switch (type) {
    case 'SET_CONFIG':
      return {
        ...state,
        [payload.key]: payload.value
      };
    case 'REFRESH':
      return {
        ...state
      };
    case 'RESET':
      localStorage.clear();
      return {
        ...state,
        ...settings
      };
    default:
      return state;
  }
}

interface MainContextProps{
  children:ReactNode
}

export const MainContext = ({ children }: MainContextProps) => {
  const configState = {
    isOverflow: getItemFromStore('isOverflow', settings.isOverflow),
    isDark: getItemFromStore('isDark', settings.isDark),
    isHide: getItemFromStore('isHide', settings.isHide),
    isSidebar: getItemFromStore('isHide', settings.isSidebar),
    row: getItemFromStore('isHide', settings.row),
  };

  const [config, dispatch] = useReducer(configReducer, configState);

  const { isLoaded } = useToggleStylesheet(
    // config.isRTL,
    config.isOverflow,
    config.isDark,
    dispatch
  );

  const setConfig = (key: string, value: any) => {
    dispatch({
      type: 'SET_CONFIG',
      payload: {
        key,
        value,
        setInStore: [
          'isOverflow',
          'isDark',
          'isHide',
          'isSidebar',
          'row'
        ].includes(key)
      }
    });
  };


  // if (!isLoaded) {
  //       return (
  //         <div
  //           style={{
  //             position: 'fixed',
  //             top: 0,
  //             right: 0,
  //             bottom: 0,
  //             left: 0,
  //             // backgroundColor: state.isDark ? getColor('dark') : getColor('light')
  //           }}
  //         />
  //       );
  //     }

  return (
    <AppContext.Provider value={{ config, setConfig, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MainContext>
        <App />
      </MainContext>
    </Provider>
  </React.StrictMode>,
)

// Remove Preload scripts loading
// postMessage({ payload: 'removeLoading' }, '*')

// Use contextBridge
// window.ipcRenderer.on('main-process-message', (_event, message) => {
//   console.log(message)
// })