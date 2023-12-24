// import React from 'react';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Chat from '../screens/Chat';
// import Dashboard from '../screens/Dashboard';
// import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
// import PostScreen from '../screens/PostScreen';
// import UserProfile from '../screens/UserProfile';

// const Tab = createMaterialTopTabNavigator();
// const DashboardStack = createNativeStackNavigator();

// function DashboardStackNavigator() {
//   return (
//     <DashboardStack.Navigator>
//       <DashboardStack.Screen 
//         name="Chats" 
//         component={Dashboard} 
//         options={{ title: 'Chats', headerShown: false }}
//       />
//       <DashboardStack.Screen 
//         name="Chat" 
//         component={Chat} 
//         options={{ headerShown: true }}
//       />
//     </DashboardStack.Navigator>
//   );
// }

// function TopTabNavigation() {
//   return (
//     <Tab.Navigator initialRouteName="DashboardStack">
//       <Tab.Screen name='posts' component={PostScreen}/>
    
//       <Tab.Screen name='profile' component={UserProfile}/>
      
//     </Tab.Navigator>
//   );
// }



// export default TopTabNavigation;