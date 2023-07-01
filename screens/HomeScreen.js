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
import Card from "../components/card";
// import Videos from "./videos";

export default function HomeScreen({ navigation }) {
  const [initializing, setInitializing] = useState(true)
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

  const [cards, setCards] = useState([]);

  const handleClick = (item) => {
    if (item.type == "VIDEO") {
      navigation.navigate("Videos", { filename: item.filename })
      return
    }
    navigation.navigate("Music", { filename: item.filename })
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
