import * as React from "react";
import { createContext } from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import MusicScreen from "../screens/MusicScreen";
import BrowseMusicScreen from "../screens/BrowseMusicScreen";
import TrackPlayer from 'react-native-track-player';
import { QueueContext } from "../contexts/TrackContext";
import useQueue from "../hooks/useQueue";



const Stack = createStackNavigator();


const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  }
}

export default MusicStack = () => {
  const useQueueData= useQueue();

  return (
    <QueueContext.Provider value={useQueueData}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: "vertical",
          transitionSpec: {
            open: config,
            close: config,
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      >
        <Stack.Screen name="MusicScreen" component={MusicScreen} />
        <Stack.Screen name="BrowseScreen" component={BrowseMusicScreen} />
      </Stack.Navigator>
    </QueueContext.Provider>
  );
};

const styles = StyleSheet.create({

});
