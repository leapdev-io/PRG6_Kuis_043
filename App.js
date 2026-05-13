import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./pages/HomeScreen";
import ApartScreen from "./pages/ApartScreen";
import HouseScreen from "./pages/HouseScreen";
import DetailScreen from "./pages/DetailScreen";
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
          drawerActiveTintColor: "#000",
          drawerActiveBackgroundColor: "#0693a8",
          drawerStyle: {
            backgroundColor: "#d8d1b4",
            width: 180,
          },
          headerStyle: {
            backgroundColor: "#d8d1b4",
          },
          headerTitleAlign: "center",
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "HOME" }}
        />
        <Drawer.Screen
          name="Apart"
          component={ApartScreen}
          options={{ title: "APART" }}
        />
        <Drawer.Screen
          name="House"
          component={HouseScreen}
          options={{ title: "HOUSE" }}
        />
        <Drawer.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: "DETAIL" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
