import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AUTH_URL, SESSION_URL } from '../private/private'


const Auth = ({ navigation }) => {

    const [token, setToken] = useState('')
    const [sessionId, setSessionId] = useState('')

    const logInHandler = () => {
        fetch(AUTH_URL)
            .then(responsive => responsive.json())
            .then(result => {
                setToken(result.request_token)
                console.log(result)
            })
    }

    const startHandler = () => {
        fetch(SESSION_URL, {    
            method: 'post',
            body: JSON.stringify({ "request_token": token }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(responsive => responsive.json())
            .then(res => {
                if (res.success == true) {
                    console.log(res)
                    setSessionId(res.session_id)
                    navigation.navigate('Main')
                } else {
                    console.log(res)
                }
            })
    }

    useEffect(() => {
        if (token.length > 2) {
            const url = `https://www.themoviedb.org/authenticate/${token}`;
            Linking.openURL(url).catch(err => console.error('An error occurred', err));
        }
    }, [token]);


    return (
        <View>
            <TouchableOpacity onPress={logInHandler}>
                <Text>Войти</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={startHandler}>
                <Text>Начать</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Auth

const styles = StyleSheet.create({})