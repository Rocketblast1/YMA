import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Card from "../components/Card";
// import Videos from "./videos";

export default function HomeScreen({ navigation }) {
  const [initializing, setInitializing] = useState(true)
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Home')
      .onSnapshot((querySnapshot) => {
        try {
          querySnapshot.forEach(documentSnapshot => {
            cards.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            })

          });
        } catch (e) {
          console.log(e)
        } finally {
          setInitializing(false)
        }
      });
    return () => {
      subscriber();
    }

  }, [])


  const handleClick = async (item) => {
    let storageFilename = ""
    await storage().ref(item.filename).getDownloadURL().then((url) => {
      storageFilename = url
    })
    if (item.type == "VIDEO") {
      let res;
      try {
        res = await firestore().collection("Videos").doc(item.title).get()
      } catch (error) {
        return console.log("Could navigate to video:" + error)
      }
      navigation.navigate("Videos", { ...res.data(), filename: storageFilename, title: item.title, })
      return
    }
    navigation.navigate("Music", { filename: storageFilename })
  }

  return (
    <>
      <FlatList
        style={styles.scrollList}
        contentContainerStyle={styles.cc}
        data={cards}
        renderItem={({ item }) => (
          <View style={styles.tc}>
            <Card title={item.title} intro={item.intro} artwork={item.artwork} onPress={() => {
              handleClick(item)
            }} />
          </View>
        )}
      />
    </>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollList: {
    backgroundColor: "violet",
  },
  songList: {
    backgroundColor: "brown",
    position: "relative",
  },
  cc: {
    backgroundColor: "blue",
  },
  ccs: {
    backgroundColor: "red",
  },
  tc: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "yellow",
  },
  text: {
    alignSelf: "center",
  },
  songBackground: {
    flex: 1,
    flexDirection: "column",
    margin: 10,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("screen").height / 22.2,
    width: Dimensions.get("screen").height / 22.2,
    borderRadius: Dimensions.get("screen").height / 20 / 6,
  },
  songCenter: {
    flex: 1,
    position: "relative",
    flexDirection: "column",
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("screen").height / 20,
    width: Dimensions.get("screen").height / 20,
    borderRadius: Dimensions.get("screen").height / 25 / 4,
  },
});
