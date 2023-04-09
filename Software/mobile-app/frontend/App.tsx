import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { LoginScreen } from './src/screen/LoginScreen'
import { SignUpScreen } from './src/screen/SignUpScreen';
import { DashboardScreen } from './src/screen/DashboardScreen';
import { useState } from 'react';
import { AuthContext } from './src/context/authContext';
import { NavigationContainer } from '@react-navigation/native';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  const [userToken, setUserToken] = useState("");


  const updateUserToken = (token:string) => {
    setUserToken(token);
  }

  return (
    <AuthContext.Provider value={{userToken, updateUserToken}}>
      
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

      { userToken == "" ? (
        <>
         <Stack.Screen name="Login" component ={LoginScreen}/>
        <Stack.Screen name="Signup" component = {SignUpScreen}/>
        </>
        ) : (
        <Stack.Screen name = "Dashboard" component={DashboardScreen}/>
        )}
      

        </Stack.Navigator>
    </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
