import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Session} from '@supabase/supabase-js';
import React, {useEffect, useState} from 'react';
import Auth from './components/login';
import Icon from 'react-native-vector-icons/FontAwesome';
import {supabase} from './helpers/supabase';
import Account from './pages/account';
import List from './components/List';

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
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Account') {
              iconName = focused ? 'user-circle' : 'user-circle-o';
            }

            return <Icon name={iconName as string} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={List} />
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
