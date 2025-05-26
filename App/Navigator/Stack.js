import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Intro } from "../Screens/Intro";
import { HomeScreen } from "../Screens/HomeScreen";
import { Profile } from "../Screens/Profile";
import { CreateEstate } from "../Screens/CreateEstate";
import { DashBoard } from "../Screens/DashBoard";
import { DeleteAccount } from "../Screens/DeleteAccount";
import { EditProfile } from "../Screens/EditProfile";
import { CreatedEstates } from "../Screens/CreatedEstates";
import { Estate } from "../Screens/Estate";
const Stack = createNativeStackNavigator();

{/*screenOptions={{ headerShown: false }}*/}
export  function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
      >
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        <Stack.Screen name="CreateEstate" component={CreateEstate} options={{headerShown: false}}/>
        <Stack.Screen name="DashBoard" component={DashBoard} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown: false}}/>
        <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
        <Stack.Screen name="Estate Groups" component={CreatedEstates} />
        <Stack.Screen name="Estate" component={Estate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
