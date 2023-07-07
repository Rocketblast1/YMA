import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
  Button,
} from "react-native";
import storage from '@react-native-firebase/storage';
export default function Card({ title, intro, source, artwork, onPress }) {
  const [initializing, setInitializing] = useState(true);
  const [url, setUrl] = useState({ uri: "" }); // TODO: Change this to the loading asset
  useEffect(() => {
    if (artwork) {
      let art = { uri: null }
      try {
        storage().ref(artwork)
          .getDownloadURL()
          .then((url) => {
            art.uri = url
            setUrl(art)
          })
      } catch (e) {
        console.log(e)
      } finally {
        setInitializing(false)
      }
    } else {
      setInitializing(false)
    }

  }, []);


  if (initializing) {
    return (
      <TouchableOpacity style={{ ...styles.container, backgroundColor: "red" }} >

      </TouchableOpacity>
    )
  }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* <View style={{display: "flex", flex: 1,}}>
     
        <ImageBackground
          style={styles.imageBackground}
          ImageResizeMode={"cover"}
          source={url}
        >

        </ImageBackground>
      </View> */}
      <Image
        source={url}
        style={{ display: "flex", flex: 1, width: "100%", height: "100%", borderRadius: 10, }}
        resizeMode={"cover"}
      />
      <Text style={styles.title}> {title} </Text>      
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    // position: "relative",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "100%",
    height: Dimensions.get("screen").height / 3,
    backgroundColor: "#53e639",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
  },
  imageBackground: {
    display: "flex",
    width: "100%",
    height: "100%",
    // transform: [{ translateX: 2.5 }, { translateY: 2.5 }],
    borderRadius: 10,
    overflow: "hidden",
  },
  content: {
    position: "relative",
    width: "100%",
    height: "100%",
    transform: [{ translateX: 2.5 }, { translateY: 2.5 }],
    backgroundColor: "#f2f2f2",
    opacity: 0.002,
    borderRadius: 10,
  },
  title: {
    position: "relative",
    marginBottom: "2%",
    marginTop: "1%",
    display: "flex",
    flex: 0.2,
    textAlignVertical: "center",
    width: "100%",
    height: "100%",
    color: "#67ff4d",
    fontSize: 30,
    opacity: 1,
    fontWeight: "bold",
    zIndex: 10,
  },
  intro: {
    position: "absolute",
    textAlignVertical: "center",
    overflow: "hidden",
    width: "90%",
    height: "50%",
    left: "1.3%",
    color: "#67ff4d",
    fontSize: 18,
    fontWeight: "bold",
    top: "40%",
  },
  gradient: {
    margin: 10,
    position: "absolute",
    width: "96%",
    height: "35%",
    top: "55%",
    overflow: "hidden",
    elevation: 70,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 70,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 70,
  },
});
