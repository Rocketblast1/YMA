import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import { VideoContext } from "../contexts/VideoContext";
import { useVideo } from "../hooks/useVideo";



const Stack = createStackNavigator();

export default HomeStack = () => {
   return (
    
         <Stack.Navigator
            screenOptions={{
               headerShown: false,
            }}
         >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
         </Stack.Navigator>
   );
};

const styles = StyleSheet.create({

});
