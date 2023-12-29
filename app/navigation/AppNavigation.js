import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TopTabNavigation from './TopTabNavigation';
import Home from '../screens/Home';
import Register from '../screens/Register';
import Login from '../screens/Login';
import {FirebaseAuth} from '../../firebaseConfig';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    // Delay for the splash screen effect
    const splashScreenDelay = setTimeout(() => {
      FirebaseAuth.onAuthStateChanged(user => {
        setIsAuthenticated(!!user);
        setIsLoading(false); // Stop loading after checking auth state
      });
    }, 2000); // Delay of 2 seconds for the splash screen

    return () => {
      clearTimeout(splashScreenDelay);
    };
  }, []);

  if (isLoading) {
    // Show the Home (splash) screen while loading
    return <Home />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAuthenticated ? (
          <Stack.Screen name="MainApp" component={TopTabNavigation} />
        ) : (
          // Navigate to Login if not authenticated
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
