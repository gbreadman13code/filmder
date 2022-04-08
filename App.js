import 'react-native-gesture-handler'

import { StyleSheet, Text, View } from 'react-native';
import WishList from './components/WishList'
import MainScreen from './components/MainScreen'
import Auth from './components/Auth'



import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function App() {

  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name={'Auth'}
          component={Auth}
        />
        <Stack.Screen
          name={'Main'}
          component={MainScreen}
          options={{
            headerShown: false,
          }}
        />
        
        <Stack.Screen
          name={'Избранное'}
          component={WishList}
          options={{
            headerBackTitle: 'Назад',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTintColor: 'white'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
