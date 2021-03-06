import { Text, View, TouchableOpacity, Image } from 'react-native'
import React, {useEffect} from 'react'
import { SESSION_GUEST_URL } from '../private/private'


const Auth = ({ navigation }) => {
    const logInHandler = () => {
        fetch(SESSION_GUEST_URL)
            .then(responsive => responsive.json())
            .then(result => {
                if (result.success == true) {
                    navigation.navigate('Main')
                }
            })
    }
    useEffect(() => {
        logInHandler()
    }, [])
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: 'black' }}>            
            {/* <TouchableOpacity onPress={logInHandler} style={{ backgroundColor: 'blue', paddingHorizontal: 10, paddingVertical: 5 }}>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 50 }}>Войти</Text>
            </TouchableOpacity> */}
        </View>
    )
}
export default Auth