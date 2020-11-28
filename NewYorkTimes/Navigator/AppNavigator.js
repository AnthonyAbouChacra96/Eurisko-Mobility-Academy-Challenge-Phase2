import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NewsFeedScreen,{screenOptions as NewsFeedScreenOptions} from '../Screens/NewsFeedScreen';
import { NavigationContainer } from "@react-navigation/native";
import Colors from "../constants/Colors";
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  // headerTitleStyle: {
  //   fontFamily: "open-sans-bold",
  // },
  // headerBackTitleStyle: {
  //   fontFamily: "open-sans",
  // },
  headerTintColor: Platform.OS === "android" ? "white" :Colors.primary,
};
const AppStackNavigator = createStackNavigator();
 const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppStackNavigator.Navigator screenOptions={defaultNavOptions}>
        <AppStackNavigator.Screen
          name="NewsFeed"
          component={NewsFeedScreen}
          options={NewsFeedScreenOptions}
        />
      </AppStackNavigator.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;