import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopTabNavigation from './TopTabNavigation';
import Home from '../screens/Home';
import Register from '../screens/Register';
import Login from '../screens/Login';
import { FirebaseAuth } from '../../firebaseConfig';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          // When authenticated, show the top tab navigation
          <Stack.Screen name="MainApp" component={TopTabNavigation} />
        ) : (
          // For unauthenticated users, show the authentication flow
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
