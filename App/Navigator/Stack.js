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
import { LogIn } from "../Screens/Login";
import { SignUp } from "../Screens/SignUp";
import { UpdateEstate } from "../Screens/UpdateEstate";
import { ForgotPassword } from '../Screens/ForgotPassword';
import { AddUsers } from '../Screens/AddUsers';
import { Residents }  from '../Screens/Residents';
import { Communities } from '../Screens/Communities';
import {AddContribution} from "../Screens/AddContribution";
import { Payment } from "../Screens/Payment";
import { Contributions } from "../Screens/Contributions";
const Stack = createNativeStackNavigator();

{/*screenOptions={{ headerShown: false }}*/}
export  function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignUp"
      >
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        <Stack.Screen name="CreateEstate" component={CreateEstate} options={{headerShown: false}}/>
        <Stack.Screen name="DashBoard" component={DashBoard} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown: false}}/>
        <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
        <Stack.Screen name="Estate Groups" component={CreatedEstates} />
        <Stack.Screen name="Communities" component={Communities} options={{ title: "Created Estates" }} />
        <Stack.Screen name="Estate" component={Estate} />
        <Stack.Screen name="Login" component={LogIn} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name="UpdateEstate" component={UpdateEstate} options={{headerShown: false}}/>
        <Stack.Screen name="Residents" component={Residents} />
        <Stack.Screen name="AddUsers" component={AddUsers} />
        <Stack.Screen name="AddContribution" component={AddContribution} />
        <Stack.Screen name="Payment" component={Payment} options={{headerShown: false}}/>
        <Stack.Screen name="Contributions" component={Contributions} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
