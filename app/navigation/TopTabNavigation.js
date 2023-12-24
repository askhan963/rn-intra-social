import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, View, StyleSheet } from 'react-native';
import { FirebaseAuth } from '../../firebaseConfig';
import Chat from '../screens/Chat';
import Dashboard from '../screens/Dashboard';
import PostScreen from '../screens/PostScreen';
import UserProfile from '../screens/UserProfile';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();
const DashboardStack = createNativeStackNavigator();

function DashboardStackNavigator() {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen 
        name="Chats" 
        component={Dashboard} 
        options={{ 
          title: 'Chats',
          headerShown: false
      }}
      />
      <DashboardStack.Screen 
        name="Chat" 
        component={Chat}
        // Add other screen options here if needed
      />
    </DashboardStack.Navigator>
  );
}

function TopTabNavigation({ navigation }) {
  // Create a custom header that will be used across all tabs
  function CustomHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Intra Social App</Text>
        <Button
          onPress={() => {
            // Implement logout functionality
            FirebaseAuth.signOut().then(() => navigation.replace('Login'));
          }}
          title="Logout"
          color="#000" // Color for the button text
        />
      </View>
    );
  }

  return (
    <>
      <CustomHeader />
      <Tab.Navigator initialRouteName="Posts">
        <Tab.Screen name="Posts" component={PostScreen} options={{ title: 'Posts' }} />
<Tab.Screen 
        name="DashboardStack" 
        component={DashboardStackNavigator} 
        options={({ route }) => ({
          title: 'Chats',
          tabBarStyle: {
            display: getTabBarVisibility(route) ? 'flex' : 'none',
          },
        })}
      />
        <Tab.Screen name="Profile" component={UserProfile} options={{ title: 'Profile' }} />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    color: '#000',
  },
});

// Determine if the tab bar should be hidden based on the route name
function getTabBarVisibility(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Chats';
  if (routeName === 'Chat') {
    return false; // When on the 'Chat' screen, return false to hide the tab bar
  }
  else
  {
    return true; // Show the tab bar on other screens
  }
 
}
export default TopTabNavigation;
