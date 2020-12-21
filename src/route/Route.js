import 'react-native-gesture-handler';
import React, {useState, useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AppContext} from '../context/AppContext';

import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';

const Stack = createStackNavigator();

const Route = () => {
    const [state] = useContext(AppContext);

    return(
        <NavigationContainer>
            { !state.login ?
            <Stack.Navigator>
                <Stack.Screen 
                    component={Login} 
                    name="LoginScreen"
                    options={{
                    title:'Login',
                    headerShown: false,
                    }}
                />
                <Stack.Screen
                    component={Register}
                    name="RegisterScreen"
                    options={{
                    title: 'Register',
                    headerShown: false
                    }}
                />
            </Stack.Navigator> :
            <Stack.Navigator>
                <Stack.Screen
                    component={Home}
                    name="HomeScreen"
                    options={{
                        title: 'Home'
                    }}
                />
            </Stack.Navigator>  
            }
        </NavigationContainer>
    )
}

export default Route;