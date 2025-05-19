// App/navigator/AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Intro } from "../Screens/Intro";
import { HomeScreen } from "../Screens/HomeScreen";
import { ProfileScreen } from "../Screens/Profile";
import { CreateEstate } from "../Screens/CreateEstate";
import { DashBoard } from "../Screens/DashBoard";
import { DeleteAccount } from "../Screens/DeleteAccount";
import { EditProfile } from "../Screens/EditProfile";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="CreateEstate" component={CreateEstate} />
        <Stack.Screen name="DashBoard" component={DashBoard} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
