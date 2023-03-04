import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from './src/screen/LoginScreen'
import { useState, createContext, useMemo } from 'react'



function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  const [userToken, setUserToken] = useState(null);

  const AuthContext = createContext(null);
  


  return (
    <AuthContext.Provider value={userToken}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        userToken == null ? 
        (<Stack.Screen name="Login" component ={LoginScreen}/>):
        ()

        </Stack.Navigator>
    </NavigationContainer>
    </AuthContext.Provider>
  );
} 


export default App;
