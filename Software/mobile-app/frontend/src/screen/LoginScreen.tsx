import { LoginBox } from '../components/LoginBox'
import { LoginStyle } from '../styles/LoginScreenStyle'
import { View, Pressable, Text, Alert} from 'react-native'
import { useState, useContext } from 'react'
import { Appbar, Snackbar } from 'react-native-paper'
import { AuthContext } from '../context/authContext'
import { authUser } from '../utilites/authenticateUser'
import strings from '../resources/strings'


const res = strings.loginScreen;

export function LoginScreen(props:any):JSX.Element { 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {updateUserToken} = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");

    const onDismissSnackBar = () => setErrorMessage("");
    const onIconPress = () => setErrorMessage("");

    async function authenticateUser(){
        let response:any  = await authUser(username, password)
        if(response.token == ""){
            setErrorMessage(response.message);
            console.log(response);

        }

        updateUserToken(response.token);
       console.log(errorMessage);
    }

    return(
    <>
       <Appbar.Header mode ="small" dark={true}>
            <Appbar.BackAction onPress={() => {props.navigation.goBack()}} />
            <Appbar.Content title="Title" />
        </Appbar.Header>
        <View style={LoginStyle.container}> 
         
            <LoginBox TextInputStyle={LoginStyle.loginBox} containerStyle={LoginStyle.containter2} 
            updateUser={(username:string) => {
            setUsername(username)}}updatePass={(pass)=> {setPassword(pass);}}/>

            <Pressable onPress={authenticateUser} style={LoginStyle.loginButton}>
                <Text style={LoginStyle.loginButtonFont}>{res.Login}</Text>
            </Pressable>

            <Pressable onPress={() => props.navigation.navigate('Signup')} style={LoginStyle.loginButton}>
                <Text style={LoginStyle.loginButtonFont}>{res.Signup}</Text>
            </Pressable>

            <Snackbar  visible={errorMessage != ""} onDismiss={onDismissSnackBar} icon="alert-outline"
            onIconPress={onIconPress}>{errorMessage}</Snackbar>
     
        </View>
    </>
      

    );
}


