import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
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
import BrowseVideos from './BrowseVideosScreen';
import { useVideo } from "../hooks/useVideo";
import { VideoContext } from "../contexts/VideoContext";
import VideoCommentsModal from "../components/VideoCommentsModal";
import { BrowseVideoList } from "../components/BrowseVideoList";

// -------------------------------------TO DO---------------------------------------------------:
// 2) Build video player UI [] (Get time of playback )

export default VideoScreen = ({ route }) => {
  // const video = null
  // const setVideo = null
  const [video, setVideo] = useContext(VideoContext)

  const height = Dimensions.get("screen").height;
  const width = Dimensions.get("screen").width;
  const [paused, setPaused] = useState(false);
  const [ref, setRef] = useState();
  const [vidPlayer, setPlayer] = useState();
  const [fullscreen, setFullscreen] = useState()
  const [controlsVisible, setControlsVisible] = useState(false)
  const [initializing, setInitializing] = useState(true)
  const [iconSize, setIconSize] = useState(height / 22)
  const [commentsVisible, setCommentsVisible] = useState(false);
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
    if (this.timer) clearTimeout(this.timer)
    setControlsVisible(true)
    this.timer = setTimeout(() => {
      setControlsVisible(false)
    }, 2000)
  }

  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
    load();
    console.log("Video Screen Loaded: " + JSON.stringify(video));

    handleFullscreen();
  }, [orientation, video]);


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


  if (video == null && initializing) {
    console.log("No Video Found" + video);
    return (
      <View style={styles.screenContainer}>
        <Text> Loading Video</Text>
      </View>
    )
  }


  if (video == null && !initializing) {
    console.log("No Video Found" + video);
    return (
      <View style={styles.screenContainer}>
        <BrowseVideos setVideo={setVideo} />
      </View>
    )

  }

  return (
    <>
      {initializing ? <></> : <View style={styles.screenContainer}>
        <View
          style={{
            flex: 2,
            position: fullscreen ? "absolute" : "relative",
            // height: height,
            // minHeight: "20%",
            width: "100%",
            zIndex: 30,
          }}
        >
          <TouchableOpacity style={{
            display: "flex",
            flex: 1,
            position: "relative",
            backgroundColor: "green",
            justifyContent: 'center',
          }}
            onPress={handleShowControls} >
            {video ? <Video
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
                console.log("Video Buffering: " + bufferObj);
              }}
              source={video ? video.url : null}
              paused={paused}
              fullscreenOrientation="landscape"
              resizeMode={fullscreen ? "cover" : "contain"}
              style={styles.backgroundVideo}
            /> : <Text> No Video Found</Text>}

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
                maximumValue={vidPlayer ? vidPlayer.seekableDuration : 0}
                value={vidPlayer ? vidPlayer.currentTime : 0}
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
        <View
          style={{
            display: "flex",
            maxHeight: "60%",
            // flexDirection: "column",
          }}
        >
          {video ? (
            <ScrollView style={{ height: "100%", minHeight: 200, backgroundColor: "blue" }}>
              {/* <VideoCommentsModal visible={commentsVisible} setVisible={setCommentsVisible} comments={video.comments} /> */}
              <VideoDescription title={video.title} description={video.description} />
              <VideoCommentsModal visible={commentsVisible} setVisible={setCommentsVisible}   >
                <AddComment title={video.title} />
                <VideoComments comments={video.comments} />
                <Button title="Close Modal" onPress={() => {
                  setCommentsVisible(false)
                }} />
              </VideoCommentsModal>
              <TouchableOpacity style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 100,
                backgroundColor: "red",
                textAlign: "center",
              }} onPress={() => {
                setCommentsVisible(true)
              }}>
                <Text style={{ textAlign: "center" }}> {video.comments.length} Comments </Text>
              </TouchableOpacity>
              <BrowseVideoList setVideo={setVideo} />
            </ScrollView>) : <></>
          }
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
    zIndex: 35,
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
    zIndex: 40,
  },
  backgroundVideo: {
    display: "flex",
    flex: 1,
    minHeight: "100%",
  },
});
