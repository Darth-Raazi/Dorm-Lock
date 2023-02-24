import {StyleSheet} from 'react-native';


export const LoginStyle = StyleSheet.create({
    loginBox:{
        height:75,
        width:250
    },
    loginButton:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 5,
        backgroundColor: 'black',
    },

    loginButtonFont:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color:'white'
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },

    containter2:{

        alignContent:'center',  
        height:250,
        rowGap:40
    }
    

}

);