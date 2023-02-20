import  { LoginBox } from '../components/LoginBox'
import { LoginStyle } from '../styles/LoginScreenStyle'
import { View } from 'react-native'

export function LoginScreen():JSX.Element {

    return(
<>

    <View style={LoginStyle.container}> 
      <LoginBox TextInputStyle={LoginStyle.loginBox} containerStyle={LoginStyle.containter2}/>

        </View>


</>
      

    );
}