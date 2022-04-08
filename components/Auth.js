import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SESSION_GUEST_URL } from '../private/private'


const Auth = ({ navigation }) => {
    const logInHandler = () => {
        fetch(SESSION_GUEST_URL)
            .then(responsive => responsive.json())
            .then(result => {
                console.log(result)
                if (result.success === true) {
                    navigation.navigate('Main')
                }
            })
    }
    return (
        <View>
            <TouchableOpacity onPress={logInHandler}>
                <Text>Войти</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Auth