import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect, useRef, useContext } from "react";
import { useWindowDimensions, useScreenDimensions, View, Text, StatusBar, } from 'react-native';
import { useDimensions, useDeviceOrientation } from "@react-native-community/hooks";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TrackContext } from "./contexts/TrackContext";

//Firebase
import auth from "@react-native-firebase/auth";

//Screens
import Nav from "./components/Nav";
import Menu from "./components/Menu";
import Profile from "./components/Profile";
import VideoScreen from "./screens/VideoScreen";

//Stacks
import HomeStack from "./stacks/HomeStack";
import LOGIN_SIGNUP_STACK from "./stacks/ProfileStack";
import MusicStack from "./stacks/MusicStack";
import VideoStack from './stacks/VideoStack';

//Contexts
import { FullscreenContext } from './contexts/FullscreenContext';
import useFullscreen from './hooks/useFullscreen';
import { VideoContext } from './contexts/VideoContext';
import { useVideo } from './hooks/useVideo';

export default App = () => {
  const { width, height } = useWindowDimensions();
  const Drawer = createDrawerNavigator();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [video, setVideo] = useVideo();


  //--------- use fullscreen hook here
  // const [fullscreen, setFullscreen] = useState();
  // const orientation = useDeviceOrientation();
  // const handleFullscreen = async () => {
  //   if (orientation == "landscape") {
  //     setFullscreen(true)
  //     StatusBar.setHidden(true)
  //   }
  //   if (orientation == "portrait") {
  //     setFullscreen(false)
  //     StatusBar.setHidden(false)
  //   }
  // }
  //--------- use fullscreen hook here
  const { fullscreen, orientation, handleFullscreen } = useFullscreen()

  const isSetup = useRef(false)
  const Player = useContext(TrackContext)
  const setUpTrackPlayer = async () => {
    try {
      await Player.setupPlayer().then(() => {
        isSetup.current = true;
        setInitializing(false)
      });

    } catch (e) {
      console.log(e)
    }
  }

  // Setting up track player on component load
  useEffect(() => {
    if (!isSetup.current) {
      setUpTrackPlayer();
    }
    setInitializing(false)
    return () => {
      isSetup.current = false
      Player.destroy()
    }
  }, [isSetup])

  // Handling authentication for user
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    handleFullscreen();
    return () => {
      subscriber(); // unsubscribe on unmount
    }
  }, [orientation]);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  // //Loading Screen
  if (initializing) return <></>;

  // //Login Navigator
  if (!user)
    return (
      <NavigationContainer style={{}}>
        <LOGIN_SIGNUP_STACK />
      </NavigationContainer>
    );


  return (
    <FullscreenContext.Provider value={fullscreen}>
      <VideoContext.Provider value={[video, setVideo]}>
          <NavigationContainer style={{ flex: 1, height: height, width: width }} >
            <StatusBar
              animated={true}
              backgroundColor={"#53e639"}
            />
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
                  <Profile navigation={navigation}
                    auth={auth}
                  />
                ),
              })}
              headerMode="screen"
            >
              <Drawer.Screen name="Home" component={HomeStack} />
              <Drawer.Screen name="Music" component={MusicStack} />
              <Drawer.Screen name="Videos" component={VideoStack} />
            </Drawer.Navigator>
          </NavigationContainer>
      </VideoContext.Provider>
    </FullscreenContext.Provider>

  )



}

