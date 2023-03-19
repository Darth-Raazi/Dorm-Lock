import { createContext } from 'react';

const test =  (token:string) => {

}

export const AuthContext = createContext({userToken:"",
                             updateUserToken:test })