import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Auth from './components/login';
import { supabase } from './helpers/supabase';
import Account from './pages/account';
import Home from './pages/Home';
import Search from './pages/Search';

const Tab = createBottomTabNavigator();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return session && session.user ? (
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
          <Tab.Screen name="Search">
          {props => (
            <Search key={session.user.id} {...props} />
          )}
        </Tab.Screen>
        <Tab.Screen name="Account">
          {props => (
            <Account key={session.user.id} session={session} {...props} />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <Auth />
  );
};

export default App;
