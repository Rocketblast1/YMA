import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Button,
  Modal,
  LogBox
} from "react-native";
import Video from "react-native-video";
import Slider from '@react-native-community/slider';
import Icon from "react-native-vector-icons/Ionicons";
import { useDimensions, useDeviceOrientation } from "@react-native-community/hooks";
import {
  // Orientation,
  PORTRAIT,
  LANDSCAPE,
} from "react-native-orientation-locker";
import VideoDescription from "../components/VideoDescription";
import VideoComments from "../components/VideoComments";
import AddComment from "../components/AddComment";
import auth from "@react-native-firebase/auth";

// ------------------------T-------------TO DO---------------------------------------------------:
// 2) Build video player UI [] (Get time of playback and build seekbar)

export default VideoScreen = ({ route }) => {
  const [video, setVideo] = useState(route.params.filename ? { uri: route.params.filename } : require("../assets/Its-A-Show-4.mp4"))
  const height = Dimensions.get("screen").height;
  const width = Dimensions.get("screen").width;
  const [paused, setPaused] = useState(false);
  const [ref, setRef] = useState();
  const [vidPlayer, setPlayer] = useState();
  const [fullscreen, setFullscreen] = useState()
  const [controlsVisible, setControlsVisible] = useState(false)
  const [initializing, setInitializing] = useState(true)
  const [iconSize, setIconSize] = useState(height / 22)
  const orientation = useDeviceOrientation();
  const handleFullscreen = async () => {
    if (orientation == "landscape") {
      setFullscreen(true)
      setIconSize(width / 8)
      StatusBar.setHidden(true)
    }
    if (orientation == "portrait") {
      setFullscreen(false)
      setIconSize(height / 22)
      StatusBar.setHidden(false)
    }
  }
  const handleShowControls = () => {
    clearTimeout(this.timer);
    setControlsVisible(true)
    this.timer = setTimeout(() => {
      setControlsVisible(false)
    }, 2000)
  }

  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
    load();
    if (route.params.filename) {
      setVideo({ uri: route.params.filename })
    }
    handleFullscreen();
  }, [orientation, route.params.filename]);


  const handlePlay = () => {
    setPaused(!paused);
  };
  const handleForward10 = () => {
    ref.seek(vidPlayer.currentTime + 10);
  };
  const handleBackward10 = () => {
    ref.seek(vidPlayer.currentTime - 10);
  };

  const load = () => {
    if (initializing) setInitializing(false);
  }

  return (
    <>
      {initializing ? <></> : <View style={styles.screenContainer}>
        <View
          style={{
            flex: 1,
            position: fullscreen ? "absolute" : "relative",
            height: fullscreen ? height : height / 2,
            width: "100%",
            zIndex: 1000,
          }}
        >
          <TouchableOpacity style={{
            flex: 1,
            position: "relative",
            backgroundColor: "green",
            justifyContent: 'center',
          }}
            onPress={handleShowControls} >
            <Video
              ref={(ref) => {
                setRef(ref);
              }}
              onReadyForDisplay={(player) => {
                setPlayer(player);
              }}
              onProgress={(player) => {
                setPlayer(player);
              }}
              onSeek={(player) => {
                setPlayer(player);
              }}
              bufferConfig={{
                minBufferMs: 15000,
                maxBufferMs: 50000,
                bufferForPlaybackMs: 2500,
                bufferForPlaybackAfterRebufferMs: 5000,
              }}
              onBuffer={(bufferObj) => {
                setPaused(true)
                console.log(bufferObj);
              }}
              source={video}
              paused={paused}
              fullscreenOrientation="landscape"
              resizeMode={fullscreen ? "cover" : "contain"}
              style={styles.backgroundVideo}
            />
            {controlsVisible ? <View style={styles.invisibleContainer}>
              <View style={styles.videoControls} >
                <TouchableOpacity style={styles.ivb} onPress={() => {
                  handleShowControls();
                  handleBackward10();
                }} >
                  <Icon name={"ios-play-back"} size={iconSize} color={"white"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.ivb} onPress={() => {
                  handleShowControls();
                  handlePlay();
                }} >
                  {!paused ? <Icon name={"ios-pause"} size={iconSize} color={"white"} /> : <Icon name={"ios-play"} size={iconSize} color={"white"} />}
                </TouchableOpacity>
                <TouchableOpacity style={styles.ivb} onPress={() => {
                  handleShowControls();
                  handleForward10();
                }} >
                  <Icon name={"ios-play-forward"} size={iconSize} color={"white"} />
                </TouchableOpacity>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={vidPlayer.seekableDuration}
                value={vidPlayer.currentTime}
                onSlidingStart={() => {
                  setPaused(true)
                  clearTimeout(this.timer)
                  setControlsVisible(true)
                }}
                onSlidingComplete={(value) => {
                  ref.seek(value)
                  handleShowControls();
                  setPaused(false)
                }}
                thumbTintColor="#53e639"
                minimumTrackTintColor="#53e639"
                maximumTrackTintColor="#FFFFFF"
              />
              <View />
            </View> : <></>}
          </TouchableOpacity>
        </View>
        <AddComment title={route.params.title}/>
        <VideoDescription title={route.params.title} description={route.params.description} />
        <VideoComments comments={route.params.comments} />
        <View style={{ flex: 2 }}>
          {initializing ? <Text>{toString(paused)}</Text> : <></>}

          {/* 
          <Text> {JSON.stringify(fullscreen)}</Text>
          <Text> {JSON.stringify(orientation)}</Text>
          <Text> {JSON.stringify(vidPlayer)}</Text>
          <Text> {JSON.stringify(route.params)}</Text> 
          */}
        </View>
      </View>}
    </>

  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "orange",
    justifyContent: "center",
  },
  button: {},
  ivb: {
    position: "relative",
    // padding: '5%',
    // marginHorizontal: '5%',
    alignSelf: "center",
    zIndex: 1001,
  },
  invisibleContainer: {
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignSelf: "center",
  },
  slider: {
    position: "absolute",
    bottom: "3%",
    width: "100%",
    height: 40,
  },
  videoControls: {
    position: "absolute",
    flex: 1,
    flexDirection: 'row',
    width: "70%",
    height: "30%",
    justifyContent: 'space-evenly',
    alignSelf: "center",
    zIndex: 1001,
  },
  backgroundVideo: {
    display: "flex",
    flex: 1,
  },
});
