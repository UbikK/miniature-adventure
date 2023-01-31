import { useHookstate } from '@hookstate/core';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { globalState } from './helpers/state';
import Home from './pages/Home';
import Auth from './pages/Login';

const Tab = createBottomTabNavigator();

const App = () => {
  const state = useHookstate(globalState);

console.info(state.userInfos)
  return state.userInfos !== undefined ? (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarActiveBackgroundColor: '#254d4c',
          tabBarInactiveBackgroundColor:'#f1f1e6',
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Account') {
              iconName = 'user-circle';
            } else if(route.name === 'Search') {
              iconName = 'plus-square'
            }

            return <Icon name={iconName as string} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#fff7d6',
          tabBarInactiveTintColor: '#254d4c',
        })}>
        <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{
            headerStyle: {
              backgroundColor: '#254d4c',
            },
            headerTintColor: '#f1f1e6',
          }}/>
          {/* <Tab.Screen name="Search">
          {props => (
            <Search key={session.user.id} {...props} />
          )}
        </Tab.Screen> */}
        <Tab.Screen name="Account">
          {props => (
            <Auth/>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <Auth />
  );
};

export default App;
