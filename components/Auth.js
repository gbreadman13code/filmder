import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SESSION_GUEST_URL } from '../private/private'


const Auth = ({ navigation }) => {
    const logInHandler = () => {
        fetch(SESSION_GUEST_URL)
        
            .then(responsive => responsive.json())
           
            .then((result) => {
                if (result.success === true) {
                    navigation.navigate('Main')
                } else {
                    console.log('error')
                }
            })
            .catch(error => console.log(error.message))
    }
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', height: '100%',}}>
            <TouchableOpacity onPress={logInHandler} style={{backgroundColor: 'blue', paddingHorizontal: 10, paddingVertical: 5}}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 50}}>Войти</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Auth