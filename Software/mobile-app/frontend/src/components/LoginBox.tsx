import { TextInput } from 'react-native-paper';
import { TextStyle, View, ViewStyle } from 'react-native'
import strings from '../resources/strings' 
import {useState} from 'react'

const res = strings.loginScreen;

 interface LoginBoxProps{

    TextInputStyle?:TextStyle
    containerStyle?:ViewStyle
    outlineStyle?:ViewStyle
    updateUser(user:string):void,
    updatePass(user:string):void
}



export function LoginBox(props:LoginBoxProps):JSX.Element{

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleCallBackUser = (user:string) => {
        props.updateUser(user);
    }

    const handleCallBackPass = (pass:string) => {
        props.updatePass(pass);
    }

    return(
        <View style={props.containerStyle}>
        <TextInput label={res.Username} style={props.TextInputStyle} value={username} onChangeText={(text) =>{setUsername(text);
        handleCallBackUser(text);}} outlineStyle={props.outlineStyle} mode='outlined'/>
        <TextInput label={res.Password} style={props.TextInputStyle}  onChangeText={text =>{setPassword(text);handleCallBackPass(text);}}outlineStyle ={props.outlineStyle} mode ='outlined'
        secureTextEntry = {true}/>
            </View>
        
        );
    }


