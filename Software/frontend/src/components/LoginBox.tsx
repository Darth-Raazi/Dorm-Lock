import { TextInput } from 'react-native-paper';
import { TextStyle, View, ViewStyle } from 'react-native'


 interface LoginBoxProps{

    TextInputStyle?:TextStyle
    containerStyle?:ViewStyle
}



export function LoginBox(props:LoginBoxProps):JSX.Element{

    return(
        <View style={props.containerStyle}>
        <TextInput label="Username" style={props.TextInputStyle} outlineColor="black"/>
        <TextInput label="Password" style={props.TextInputStyle}outlineColor="black"/>
            </View>
        
        );
    }


