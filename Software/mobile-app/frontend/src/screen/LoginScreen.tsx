import  { LoginBox } from '../components/LoginBox'
import { LoginStyle } from '../styles/LoginScreenStyle'
import { View, Pressable, Text } from 'react-native'
import { useState, useEffect } from 'react'
import strings from '../resources/strings'

const res = strings.loginScreen;

export function LoginScreen():JSX.Element { 
    const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");


    const callback:(username:string, password:string)=>void = (username:string,password:string) => {

        setUsername(username);
        setPassword(password);
         
     }
   function authenticateUser(){
    
   }

    return(
    <>
        <View style={LoginStyle.container}> 
        <LoginBox TextInputStyle={LoginStyle.loginBox} containerStyle={LoginStyle.containter2} 
        updateUser={(username:string) => {
        setUsername(username)}}updatePass={
            (pass)=> {
                setPassword(pass);
            }   
        }/>
        <Pressable onPress={authenticateUser} style={LoginStyle.loginButton}>
            <Text style={LoginStyle.loginButtonFont}>{res.Login}</Text>
        </Pressable>

        </View>
    </>
      

    );
}



