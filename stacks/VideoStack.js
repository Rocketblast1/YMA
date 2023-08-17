import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import VideoScreen from "../screens/VideoScreen";
import { useContext } from "react";
import { FullscreenContext } from "../contexts/FullscreenContext";
import { VideoContext } from "../contexts/VideoContext";


const Stack = createStackNavigator();

export default VideoStack = () => {
   // const [video, setVideo] = useContext(VideoContext)
   // const { fullscreen } = useContext(FullscreenContext)
   return (
      // <VideoContext.Provider value={[video, setVideo]}>
         <Stack.Navigator
            screenOptions={{
               headerShown: false,
            }}
         >
            <Stack.Screen name="VideoScreen" component={VideoScreen}
            // initialParams={{ fullscreen: fullscreen }} 
            />
         </Stack.Navigator>
      // </VideoContext.Provider>
   );
};

const styles = StyleSheet.create({

});
