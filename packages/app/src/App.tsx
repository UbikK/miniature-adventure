import { GOOGLE_SIGNIN_CLIENT_ID } from "@env";
import { useHookstate } from "@hookstate/core";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { globalstate } from "./helpers/state";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Search from "./pages/Search";
GoogleSignin.configure({
  webClientId: GOOGLE_SIGNIN_CLIENT_ID,
  scopes: [
    "email",
    "openid",
  ],
});

const Tab = createBottomTabNavigator();

const App = () => {
  const state = useHookstate(globalstate);

  if (state.promised) {
    return <Text>Loading</Text>;
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={state.isSignedIn.value ? "Home" : "Account"}
        screenOptions={({ route }) => ({
          tabBarActiveBackgroundColor: "#254d4c",
          tabBarInactiveBackgroundColor: "#f1f1e6",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Account") {
              iconName = "user-circle";
            } else if (route.name === "Search") {
              iconName = "plus-square";
            }

            return <Icon name={iconName as string} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#fff7d6",
          tabBarInactiveTintColor: "#254d4c",
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: {
              backgroundColor: "#254d4c",
            },
            headerTintColor: "#f1f1e6",
          }}
        />
        <Tab.Screen
          name="Search"
          options={{
            headerStyle: {
              backgroundColor: "#254d4c",
            },
            headerTintColor: "#f1f1e6",
          }}
          component={Search}
        />

        <Tab.Screen name="Account">
          {(props) => <Account />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
