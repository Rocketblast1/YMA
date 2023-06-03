import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect, useRef, useContext } from "react";
import { useWindowDimensions, View, Text } from 'react-native';
import { useDimensions, useDeviceOrientation } from "@react-native-community/hooks";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from './stacks/HomeStack';

//Screens
import Menu from "./components/menu";
import Profile from "./components/Profile";

const R = () => (
  <View>
    <Text>
      Hello 2
    </Text>
  </View>
)

export default App = () => {
  const { width, height } = useWindowDimensions();
  const Drawer = createDrawerNavigator();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const muicPlayerIsSetup = useRef(false)
  const [fullscreen, setFullscreen] = useState();
  const orientation = useDeviceOrientation();
  useEffect(() => {
    
    return () => {
      
    }
  }, [])
  
  return (
    <NavigationContainer style={{ flex: 1, height: height, width: width }} >
      <Drawer.Navigator
        screenOptions={({ navigation }) => ({
          headerShown: !fullscreen,
          initialRouteName: "Home",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#53e639",
            height: 55,
          },
          drawerStyle: {
            backgroundColor: "#53e639",
          },
          drawerContentOptions: {
            activeTintColor: "#8eff7a",
            itemStyle: {
              marginTop: 10,
              justifyContent: "center",
            },
            labelStyle: {
              fontSize: 25,
              color: "white",
            },
          },
          headerLeft: () => <Menu navigation={navigation} />,
          headerTitle: () => <Nav navigation={navigation} />,
          headerRight: () => (
            <Profile navigation={navigation} auth={auth} />
          ),
        })}
        headerMode="screen"
      >
        <Drawer.Screen name="Home" component={HomeStack} />
        {/* <Drawer.Screen name="Music" component={MusicStack} /> */}
        {/* <Drawer.Screen name="Videos" component={Videos} initialParams={{ fullscreen: fullscreen }} /> */}
        {/* <Drawer.Screen name="Profile" component={ProfileStack} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  )


  // return (
  //   <NavigationContainer>
  //     <Drawer.Navigator>
  //       <Drawer.Screen name="Home" component={R}/>
  //     </Drawer.Navigator>
  //   </NavigationContainer>
  // )
}

