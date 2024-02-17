import React, { useContext, useState } from "react";
import * as apiClient from '../api-client';
import Toast from "../components/Toast";
import {useQuery } from "react-query";


type TostMessage ={
    message: string,
    type: 'SUCCESS' | 'ERROR'
};

type AppContext = {
    showTost: (toastMessage: TostMessage)=> void;
    isLoggedIn: boolean;
};
//the first time that the app load, the context is undifined.
const AppContext = React.createContext<AppContext | undefined>(undefined);


export const AppContextProvider = ({children} : {children: React.ReactNode})=>{
  
  const [toast, setToast] = useState<TostMessage | undefined>(undefined);//to hold the state of the toast.

  const {isError} = useQuery('validateToken', apiClient.validateToken, {
    retry: false
  })
   
 
  return(
    <AppContext.Provider value={{showTost: (toastMessage)=> {
      setToast(toastMessage)
    },
    isLoggedIn: !isError
    }}>
      {toast && (<Toast message={toast.message} type={toast.type} onClose={()=> setToast(undefined)}/>)}
      {children}
    </AppContext.Provider>
  )
};


export const useAppContext = ()=>{//this hook let our component easyly access to this provider
  const context = useContext(AppContext);
  return context as AppContext;
}
